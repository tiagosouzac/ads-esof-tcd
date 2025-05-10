<script>
	import ProjectDetails from '$lib/ui/sections/project-details.svelte';
	import ProjectRequirements from '$lib/ui/sections/project-requirements.svelte';
	import ProjectTasks from '$lib/ui/sections/project-tasks.svelte';

	const project = {
		status: 'IN_PROGRESS',
		tasks: {
			total: 10,
			completed: 3
		},
		requirements: {
			total: 10,
			completed: 3
		}
	};

	const requirements = [
		{
			id: 1,
			title: 'Lorem ipsum dolor sit amet',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			status: 'COMPLETED'
		},
		{
			id: 2,
			title: 'Consectetur adipiscing elit',
			description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			status: 'IN_PROGRESS'
		},
		{
			id: 3,
			title: 'Sed do eiusmod tempor incididunt',
			description:
				'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			status: 'PENDING'
		}
	];

	const tasks = [
		{
			id: 1,
			title: 'Lorem ipsum dolor sit amet',
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
			status: 'COMPLETED',
			assignee: 'Igor'
		},
		{
			id: 2,
			title: 'Consectetur adipiscing elit',
			description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
			status: 'COMPLETED'
		},
		{
			id: 3,
			title: 'Sed do eiusmod tempor incididunt',
			description:
				'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
			status: 'COMPLETED'
		}
	];
</script>

<ProjectDetails {project} />
<ProjectRequirements {requirements} />
<ProjectTasks {tasks} />
