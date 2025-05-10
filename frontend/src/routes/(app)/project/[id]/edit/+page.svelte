<script>
	import ProjectForm from '$lib/ui/sections/project-form.svelte';
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
			name: 'Lorem ipsum dolor sit amet',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			status: 'IN_PROGRESS'
		}}
	/>
</div>
