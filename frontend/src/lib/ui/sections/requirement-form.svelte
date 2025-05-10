<script>
	import { Plus, Save } from '@lucide/svelte';
	import Select from '../components/select.svelte';

	const {
		requirement = { title: '', description: '', status: 'PENDING' },
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
			placeholder="Digite o título do requisito"
			defaultValue={requirement.title}
		/>
	</div>

	<div>
		<label for="description">Descrição</label>

		<textarea
			id="description"
			name="description"
			rows="5"
			placeholder="Descreva os detalhes do requisito">{requirement.description}</textarea
		>
	</div>

	<div class="grid grid-cols-2 gap-2">
		<div>
			<label for="status">Status</label>

			<Select id="status" name="status">
				<option value="PENDING" selected={requirement.status === 'PENDING'}>Pendente</option>
				<option value="IN_PROGRESS" selected={requirement.status === 'IN_PROGRESS'}>
					Em andamento
				</option>
				<option value="COMPLETED" selected={requirement.status === 'COMPLETED'}>Concluído</option>
			</Select>
		</div>
	</div>

	<div class="flex items-center gap-1.5">
		{#if requirement.title !== ''}
			<button class="btn" type="submit">
				<Save />
				Salvar alterações
			</button>
		{:else}
			<button class="btn" type="submit">
				<Plus />
				Criar requisito
			</button>
		{/if}

		<button class="btn-outline" type="button" onclick={oncancel}>Cancelar</button>
	</div>
</form>
