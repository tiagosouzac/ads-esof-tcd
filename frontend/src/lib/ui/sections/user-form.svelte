<script>
	import { applyAction, enhance } from '$app/forms';
	import { Plus, Save, Trash } from '@lucide/svelte';
	import Select from '../components/select.svelte';
	import Input from '../components/input.svelte';
	import { Role } from '$lib/models/user';
	import { fade } from 'svelte/transition';

	const {
		user = { id: '', name: '', email: '', password: '', role: 'DEVELOPER' },
		closeForm,
		form
	} = $props();

	const roles = [
		{ value: Role.MANAGER, label: 'Administrador' },
		{ value: Role.ARCHITECT, label: 'Arquiteto' },
		{ value: Role.DESIGNER, label: 'Designer' },
		{ value: Role.DEVELOPER, label: 'Desenvolvedor' },
		{ value: Role.QUALITY_ANALYST, label: 'Analista de Qualidade' }
	];
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
	{#if user.id}
		<input type="hidden" name="id" value={user.id} />
	{/if}

	<Input
		id="name"
		name="name"
		type="text"
		label="Nome completo"
		placeholder="Digite o nome completo do usuário"
		value={user.name}
		error={form?.errors?.name?.[0]}
		required
	/>

	<Input
		id="email"
		name="email"
		type="email"
		label="E-mail"
		placeholder="Digite o e-mail do usuário"
		value={user.email}
		error={form?.errors?.email?.[0]}
		required
	/>

	<Input
		id="password"
		name="password"
		type="password"
		label="Senha"
		placeholder={user.id
			? 'Digite para alterar a senha ou deixe em branco'
			: 'Digite a senha do usuário'}
		value=""
		error={form?.errors?.password?.[0]}
		required={!user.id}
	/>

	<Select
		id="role"
		name="role"
		label="Função"
		options={roles}
		selected={user.role}
		error={form?.errors?.role?.[0]}
	/>

	<div class="flex items-center justify-between gap-3">
		<div class="flex items-center gap-1.5">
			{#if user.id !== ''}
				<button class="btn" type="submit" formaction="?/update">
					<Save />
					Salvar alterações
				</button>
			{:else}
				<button class="btn" type="submit" formaction="?/create">
					<Plus />
					Criar usuário
				</button>
			{/if}

			<button class="btn-outline" type="button" onclick={closeForm}>Cancelar</button>
		</div>
	</div>

	{#if form?.errors?.form}
		<div class="rounded-md bg-red-50 p-4 text-red-800" transition:fade>
			{#each form.errors.form as error}
				<div>{error}</div>
			{/each}
		</div>
	{/if}
</form>
