<script>
	import { Plus, Save } from '@lucide/svelte';
	import Select from '../components/select.svelte';

	const {
		task = { title: '', description: '', status: 'PENDING', assignee: '' },
		onsubmit,
		oncancel
	} = $props();
</script>

<form {onsubmit}>
	<div>
		<label for="title">Título</label>

		<input
			id="title"
			name="title"
			type="text"
			placeholder="Digite o título da tarefa"
			defaultValue={task.title}
		/>
	</div>

	<div>
		<label for="description">Descrição</label>

		<textarea
			id="description"
			name="description"
			rows="5"
			placeholder="Descreva os detalhes da tarefa">{task.description}</textarea
		>
	</div>

	<div class="grid grid-cols-2 gap-2">
		<div>
			<label for="status">Status</label>

			<Select id="status" name="status">
				<option value="PENDING" selected={task.status === 'PENDING'}>Pendente</option>
				<option value="IN_PROGRESS" selected={task.status === 'IN_PROGRESS'}>Em andamento</option>
				<option value="COMPLETED" selected={task.status === 'COMPLETED'}>Concluído</option>
			</Select>
		</div>

		<div>
			<label for="assignee">Atribuído a</label>

			<Select id="assignee" name="assignee">
				<option value="Tiago" selected={task.assignee === 'Tiago'}>Tiago</option>
				<option value="Igor" selected={task.assignee === 'Igor'}>Igor</option>
			</Select>
		</div>
	</div>

	<div class="flex items-center gap-1.5">
		{#if task.title !== ''}
			<button class="btn" type="submit">
				<Save />
				Salvar alterações
			</button>
		{:else}
			<button class="btn" type="submit">
				<Plus />
				Criar tarefa
			</button>
		{/if}

		<button class="btn-outline" type="button" onclick={oncancel}>Cancelar</button>
	</div>
</form>
