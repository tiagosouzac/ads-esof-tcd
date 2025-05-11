<script>
	import ProjectForm from '$lib/ui/sections/project-form.svelte';

	const { data, form } = $props();
</script>

<div class="space-y-6">
	<div class="space-y-2">
		<h1>Editar projeto</h1>

		<p class="text-lg">
			Preencha os campos abaixo para editar o projeto. Você pode adicionar mais detalhes e os
			requisitos do projeto depois.
		</p>
	</div>

	<ProjectForm
		project={{
			name: data.project.name,
			description: data.project.description,
			status: data.project.status
		}}
		{form}
	/>
</div>
