<script>
	import ProjectStatus from './project-status.svelte';

	let { title, description, status, requirements, tasks } = $props();
</script>

<div class="space-y-6 rounded-md border p-6 transition-colors duration-200 hover:bg-neutral-50">
	<div class="space-y-1">
		<h3>{title}</h3>
		<p class="line-clamp-3">{description}</p>
	</div>

	<ProjectStatus {status} {requirements} {tasks} />
</div>
