<script>
	import { applyAction, enhance } from '$app/forms';
	import { Plus, Save, Trash } from '@lucide/svelte';
	import Select from '../components/select.svelte';
	import Input from '../components/input.svelte';
	import Textarea from '../components/textarea.svelte';

	const {
		requirement = { id: '', title: '', description: '', status: 'PENDING' },
		closeForm,
		form
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
	{#if requirement.id}
		<input type="hidden" name="requirementId" value={requirement.id} />
	{/if}

	<Input
		id="title"
		name="title"
		type="text"
		label="Título"
		placeholder="Digite o título do requisito"
		value={requirement.title}
		error={form?.errors?.title?.[0]}
		required
	/>

	<Textarea
		id="description"
		name="description"
		label="Descrição"
		placeholder="Descreva os detalhes do requisito"
		value={requirement.description}
		error={form?.errors?.description?.[0]}
		rows={5}
	/>

	<Select
		id="status"
		name="status"
		label="Status"
		options={[
			{ value: 'PENDING', label: 'Pendente' },
			{ value: 'IN_PROGRESS', label: 'Em andamento' },
			{ value: 'COMPLETED', label: 'Concluído' }
		]}
		selected={requirement.status}
		error={form?.errors?.status?.[0]}
	/>

	<div class="flex items-center justify-between gap-3">
		<div class="flex items-center gap-1.5">
			{#if requirement.title !== ''}
				<button class="btn" type="submit" formaction="?/update-requirement">
					<Save />
					Salvar alterações
				</button>
			{:else}
				<button class="btn" type="submit" formaction="?/create-requirement">
					<Plus />
					Criar requisito
				</button>
			{/if}

			<button class="btn-outline" type="button" onclick={closeForm}>Cancelar</button>
		</div>

		<button class="btn-icon btn-destructive" type="submit" formaction="?/delete-requirement">
			<Trash />
			<span class="sr-only">Excluir requisito</span>
		</button>
	</div>
</form>
