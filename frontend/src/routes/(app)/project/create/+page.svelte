<script>
	import ProjectForm from '$lib/ui/sections/project-form.svelte';

	const { form } = $props();
</script>

<div class="space-y-6">
	<div class="space-y-2">
		<h1>Criar projeto</h1>

		<p class="text-lg">
			Preencha os campos abaixo para criar um novo projeto. Você pode adicionar mais detalhes e os
			requisitos do projeto depois.
		</p>
	</div>

	<ProjectForm {form} />
</div>
