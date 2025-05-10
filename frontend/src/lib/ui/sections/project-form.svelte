<script>
	import { Plus, Save } from '@lucide/svelte';
	import Select from '../components/select.svelte';

	const { project = { name: '', description: '', status: 'PENDING' } } = $props();
</script>

<form>
	<div>
		<label for="name">Nome <span class="text-red-700">*</span></label>

		<input
			id="name"
			name="name"
			type="text"
			placeholder="Ex.: Gerenciador de projetos"
			defaultValue={project.name ?? ''}
		/>
	</div>

	<div>
		<label for="description">Descrição <span class="text-red-700">*</span></label>

		<textarea
			name="description"
			id="description"
			placeholder="Descreva o projeto detalhadamente, incluindo objetivos e funcionalidades"
			rows="5">{project.description ?? ''}</textarea
		>
	</div>

	<div>
		<label for="description">Status</label>

		<Select id="status" name="status">
			<option value="PENDING" selected={project.status === 'PENDING'}>Pendente</option>
			<option value="IN_PROGRESS" selected={project.status === 'IN_PROGRESS'}>Em andamento</option>
			<option value="COMPLETED" selected={project.status === 'COMPLETED'}>Concluído</option>
		</Select>
	</div>

	{#if project.name !== ''}
		<button class="btn w-44">
			<Save />
			Salvar alterações
		</button>
	{:else}
		<button class="btn w-44">
			<Plus />
			Criar projeto
		</button>
	{/if}
</form>
