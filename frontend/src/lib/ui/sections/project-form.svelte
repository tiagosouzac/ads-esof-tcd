<script lang="ts">
	import { enhance } from '$app/forms';
	import { Plus, Save } from '@lucide/svelte';
	import Input from '../components/input.svelte';
	import Textarea from '../components/textarea.svelte';
	import Select from '../components/select.svelte';
	import { User } from '$lib/models/user';
	import type { Project } from '$lib/models/project';

	const {
		project,
		form,
		architects,
		designers,
		developers,
		qualityAnalysts
	}: {
		project?: Project;
		form: any;
		architects: User[];
		designers: User[];
		developers: User[];
		qualityAnalysts: User[];
	} = $props();
</script>

<form method="POST" use:enhance>
	<Input
		id="name"
		name="name"
		type="text"
		label="Nome do projeto"
		placeholder="Ex.: Gerenciador de projetos"
		value={project?.name ?? ''}
		error={form?.errors?.name?.[0]}
		required
	/>

	<Textarea
		id="description"
		name="description"
		label="Descrição do projeto"
		placeholder="Descreva o projeto detalhadamente, incluindo objetivos e funcionalidades"
		value={project?.description ?? ''}
		error={form?.errors?.description?.[0]}
		rows={5}
		required
	/>

	<Select
		id="architect"
		name="architect"
		label="Arquiteto responsável"
		options={architects.map((a: User) => ({ value: a.id, label: a.name }))}
		value={project?.architectId ?? ''}
		selected={project?.architectId ?? ''}
		error={form?.errors?.architect?.[0]}
		required
	/>

	<Select
		id="designer"
		name="designer"
		label="Designer responsável"
		options={designers.map((d: User) => ({ value: d.id, label: d.name }))}
		value={project?.designerId ?? ''}
		selected={project?.designerId ?? ''}
		error={form?.errors?.designer?.[0]}
		required
	/>

	<Select
		id="developer"
		name="developer"
		label="Desenvolvedor responsável"
		options={developers.map((d: User) => ({ value: d.id, label: d.name }))}
		value={project?.developerId ?? ''}
		selected={project?.developerId ?? ''}
		error={form?.errors?.developer?.[0]}
		required
	/>

	<Select
		id="qualityAnalyst"
		name="qualityAnalyst"
		label="Analista de qualidade responsável"
		options={qualityAnalysts.map((qa: User) => ({ value: qa.id, label: qa.name }))}
		value={project?.qualityAnalystId ?? ''}
		selected={project?.qualityAnalystId ?? ''}
		error={form?.errors?.qualityAnalyst?.[0]}
		required
	/>

	{#if project && project?.name !== ''}
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
