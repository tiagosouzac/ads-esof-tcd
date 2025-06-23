<script>
	import { applyAction, enhance } from '$app/forms';
	import { Plus, Save, Trash } from '@lucide/svelte';
	import Select from '../components/select.svelte';
	import Input from '../components/input.svelte';
	import Textarea from '../components/textarea.svelte';

	const {
		task = { title: '', description: '', status: 'PENDING', assignee: '' },
		users = [],
		form,
		closeForm
	} = $props();
</script>

<form
	method="POST"
	use:enhance={() => {
		return async ({ result, update }) => {
			await applyAction(result);
			await update();

			if (result.type === 'success') {
				closeForm();
			}
		};
	}}
>
	{#if task.id}
		<input name="taskId" type="hidden" value={task.id} />
	{/if}

	<Input
		id="title"
		name="title"
		type="text"
		label="Título"
		placeholder="Digite o título da tarefa"
		value={task.title}
		error={form?.errors?.title?.[0]}
		required
	/>

	<Textarea
		id="description"
		name="description"
		label="Descrição"
		placeholder="Descreva os detalhes da tarefa"
		value={task.description}
		error={form?.errors?.description?.[0]}
		rows={5}
	/>

	<div class="grid grid-cols-2 gap-2">
		<Select
			id="status"
			name="status"
			label="Status"
			options={[
				{ value: 'PENDING', label: 'Pendente' },
				{ value: 'IN_PROGRESS', label: 'Em andamento' },
				{ value: 'COMPLETED', label: 'Concluído' }
			]}
			value={task.status}
			error={form?.errors?.status?.[0]}
			selected={task.status}
		/>

		<Select
			id="assigneeId"
			name="assigneeId"
			label="Atribuído a"
			options={users.map((user) => ({
				value: user.id,
				label: user.name
			}))}
			error={form?.errors?.assignee?.[0]}
			selected={task.assignee?.id}
		/>
	</div>

	<div class="flex items-center justify-between gap-3">
		<div class="flex items-center gap-1.5">
			{#if 'id' in task}
				<button class="btn" type="submit" formaction="?/update-task">
					<Save />
					Salvar alterações
				</button>
			{:else}
				<button class="btn" type="submit" formaction="?/create-task">
					<Plus />
					Criar tarefa
				</button>
			{/if}

			<button class="btn-outline" type="button" onclick={closeForm}>Cancelar</button>
		</div>

		{#if task.id !== ''}
			<button class="btn-icon btn-destructive" type="submit" formaction="?/delete-task">
				<Trash />
				<span class="sr-only">Excluir tarefa</span>
			</button>
		{/if}
	</div>
</form>
