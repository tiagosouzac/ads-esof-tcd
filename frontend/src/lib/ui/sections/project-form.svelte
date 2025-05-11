<script>
	import { enhance } from '$app/forms';
	import { Plus, Save } from '@lucide/svelte';
	import Input from '../components/input.svelte';
	import Textarea from '../components/textarea.svelte';

	const { project = { name: '', description: '' }, form } = $props();
</script>

<form method="POST" use:enhance>
	<Input
		id="name"
		name="name"
		type="text"
		label="Nome do projeto"
		placeholder="Ex.: Gerenciador de projetos"
		value={project.name ?? ''}
		error={form?.errors?.name?.[0]}
		required
	/>

	<Textarea
		id="description"
		name="description"
		label="Descrição do projeto"
		placeholder="Descreva o projeto detalhadamente, incluindo objetivos e funcionalidades"
		value={project.description ?? ''}
		error={form?.errors?.description?.[0]}
		rows={5}
		required
	/>

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
