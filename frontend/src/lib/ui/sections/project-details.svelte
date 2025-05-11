<script>
	import { Edit } from '@lucide/svelte';
	import ProjectStatus from '../components/project-status.svelte';

	const { project } = $props();
</script>

<section class="space-y-6">
	<div class="space-y-2">
		<h1>{project.name}</h1>
		<p class="text-lg">{project.description}</p>
	</div>

	<div class="flex items-center justify-between">
		<ProjectStatus
			status={project.status}
			requirements={project.requirements}
			tasks={project.tasks}
		/>

		<a class="flex items-center gap-1.5 hover:text-neutral-900" href="/project/1/edit">
			<Edit class="size-4" />
			<span class="text-sm">Editar projeto</span>
		</a>
	</div>
</section>
