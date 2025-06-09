<script>
	import ProjectDetails from '$lib/ui/sections/project-details.svelte';
	import ProjectPrototypes from '$lib/ui/sections/project-prototypes.svelte';
	import ProjectRequirements from '$lib/ui/sections/project-requirements.svelte';
	import ProjectTasks from '$lib/ui/sections/project-tasks.svelte';

	const { data, form } = $props();
</script>

<ProjectDetails project={data.project} />
<ProjectRequirements requirements={data.project.requirements} {form} />
<ProjectPrototypes prototypes={data.project.prototypes} {form} />
<ProjectTasks tasks={data.project.tasks} users={data.users} {form} />
