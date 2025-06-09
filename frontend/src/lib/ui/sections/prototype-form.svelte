<script>
	import { applyAction, enhance } from '$app/forms';
	import { Plus, Save, Trash } from '@lucide/svelte';
	import Input from '../components/input.svelte';

	const { prototype = { id: '', link: '' }, closeForm, form } = $props();
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
	{#if prototype.id}
		<input type="hidden" name="prototypeId" value={prototype.id} />
	{/if}

	<Input
		id="name"
		name="name"
		type="text"
		label="Nome"
		placeholder="Digite o nome do protótipo"
		value={prototype.name}
		error={form?.errors?.name?.[0]}
		required
	/>

	<Input
		id="link"
		name="link"
		type="url"
		label="Link"
		placeholder="Insira o link do protótipo"
		value={prototype.link}
		error={form?.errors?.link?.[0]}
		required
	/>

	<div class="flex items-center justify-between gap-3">
		<div class="flex items-center gap-1.5">
			{#if prototype.id !== ''}
				<button class="btn" type="submit" formaction="?/update-prototype">
					<Save />
					Salvar alterações
				</button>
			{:else}
				<button class="btn" type="submit" formaction="?/create-prototype">
					<Plus />
					Criar protótipo
				</button>
			{/if}

			<button class="btn-outline" type="button" onclick={closeForm}>Cancelar</button>
		</div>

		{#if prototype.id !== ''}
			<button class="btn-icon btn-destructive" type="submit" formaction="?/delete-prototype">
				<Trash />
				<span class="sr-only">Excluir protótipo</span>
			</button>
		{/if}
	</div>
</form>
