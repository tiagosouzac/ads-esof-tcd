<script>
	import { Check, Edit, User, X } from '@lucide/svelte';
	import Status from './status.svelte';
	import TaskForm from '../sections/task-form.svelte';
	import { UserService } from '$lib/services/user';
	import { enhance } from '$app/forms';

	let { task, users, form, user } = $props();

	const canEditTasks = UserService.isDeveloper(user);
	const canApproveTasks = UserService.isQualityAnalyst(user) || UserService.isManager(user);

	let isEditing = $state(false);

	function toggleEdit() {
		if (!canEditTasks) return;
		isEditing = !isEditing;
	}
</script>

{#if !isEditing}
	<div
		class="group relative w-full cursor-default rounded-md border p-6 text-left transition-colors duration-200 {canEditTasks
			? 'hover:bg-neutral-50'
			: ''}"
	>
		<div class="space-y-4">
			<div class="space-y-1">
				<strong>{task.title}</strong>
				<p class="text-sm">{task.description}</p>
			</div>

			<div class="flex flex-wrap items-center gap-x-6 gap-y-2">
				<Status status={task.status} />

				{#if task.assignee?.id}
					<span class="flex items-center gap-2 text-sm">
						<User class="size-4" />
						{task.assignee.name}
					</span>
				{/if}
			</div>
		</div>

		<div
			class="absolute right-3 top-3 flex gap-2 {canEditTasks || canApproveTasks
				? 'opacity-0 transition-opacity duration-200 group-hover:opacity-100'
				: ''}"
		>
			{#if canApproveTasks}
				<form method="POST" use:enhance>
					<input type="hidden" name="taskId" value={task.id} />

					<button
						class={[
							'cursor-pointer transition-colors duration-200 hover:text-green-600',
							task.isApproved === 'APPROVED' && 'text-green-600'
						]}
						formaction="?/approve-task"
						type="submit"
					>
						<Check class="size-5" />
						<div class="sr-only">Aprovar</div>
					</button>
				</form>

				<form method="POST" use:enhance>
					<input type="hidden" name="taskId" value={task.id} />

					<button
						class={[
							'cursor-pointer transition-colors duration-200 hover:text-red-600',
							task.isApproved === 'DISAPPROVED' && 'text-red-600'
						]}
						formaction="?/reject-task"
						type="submit"
					>
						<X class="size-5 rotate-180" />
						<div class="sr-only">Rejeitar</div>
					</button>
				</form>
			{/if}

			{#if canEditTasks}
				<button class="cursor-pointer" onclick={() => toggleEdit()}>
					<Edit class="size-5" />
				</button>
			{/if}
		</div>
	</div>
{:else}
	<div class="space-y-4 rounded-md border p-6">
		<div>
			<h3>Editar tarefa</h3>

			<p>
				Atualize os detalhes da tarefa nos campos abaixo. Lembre-se de salvar as alterações ao final
				do formulário.
			</p>
		</div>

		<TaskForm {task} {users} {form} closeForm={toggleEdit} />
	</div>
{/if}
