<script>
	import { Edit, Save, User } from '@lucide/svelte';
	import Status from './status.svelte';
	import TaskForm from '../sections/task-form.svelte';

	let { title, description, status, assignee } = $props();

	let isEditing = $state(false);

	function toggleEdit() {
		isEditing = !isEditing;
	}
</script>

{#if !isEditing}
	<button
		class="group relative w-full cursor-pointer rounded-md border p-6 text-left transition-colors duration-200 hover:bg-neutral-50"
		onclick={toggleEdit}
	>
		<div class="space-y-4">
			<div class="space-y-1">
				<strong>{title}</strong>
				<p class="text-sm">{description}</p>
			</div>

			<div class="flex flex-wrap items-center gap-x-6 gap-y-2">
				<Status {status} />

				<span class="flex items-center gap-2 text-sm">
					<User class="size-4" />
					Tiago
				</span>
			</div>
		</div>

		<Edit
			class="absolute right-3 top-3 size-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
		/>
	</button>
{:else}
	<div class="space-y-4 rounded-md border p-6">
		<div>
			<h3>Editar tarefa</h3>

			<p>
				Atualize os detalhes da tarefa nos campos abaixo. Lembre-se de salvar as alterações ao final
				do formulário.
			</p>
		</div>

		<TaskForm
			task={{ title, description, status, assignee }}
			onsubmit={toggleEdit}
			oncancel={toggleEdit}
		/>
	</div>
{/if}
