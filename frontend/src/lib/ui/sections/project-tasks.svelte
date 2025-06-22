<script>
	import { Plus } from '@lucide/svelte';
	import Task from '../components/task.svelte';
	import TaskForm from './task-form.svelte';
	import { UserService } from '$lib/services/user';

	const { tasks = [], users, form, user } = $props();

	const canEditTasks = UserService.isDeveloper(user);

	let creatingTask = $state(false);

	function toggleTaskForm() {
		creatingTask = !creatingTask;
	}
</script>

<section class="space-y-4">
	<div>
		<h2>Tarefas</h2>
		<p>As tarefas do projeto são as seguintes:</p>
	</div>

	<div class="space-y-2">
		{#if tasks.length === 0}
			{#if !creatingTask}
				<p class="rounded-md border px-6 py-12 text-center">
					Você ainda não cadastrou nenhuma tarefa para este projeto. Clique no botão abaixo para
					adicionar a primeira tarefa.
				</p>
			{/if}
		{:else}
			<ul class="space-y-1.5">
				{#each tasks as task}
					<li>
						<Task {task} {users} {form} {user} />
					</li>
				{/each}
			</ul>
		{/if}

		{#if creatingTask}
			<div class="space-y-4 rounded-md border p-6">
				<div>
					<h3>Adicionar tarefa</h3>
					<p>Preencha os campos abaixo para adicionar uma nova tarefa ao projeto.</p>
				</div>

				<TaskForm closeForm={toggleTaskForm} {form} {users} />
			</div>
		{/if}

		{#if !creatingTask && canEditTasks}
			<button class="btn" onclick={toggleTaskForm}>
				<Plus />
				Adicionar tarefa
			</button>
		{/if}
	</div>
</section>
