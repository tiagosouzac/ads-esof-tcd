<script>
	import ProjectStatus from '$lib/ui/components/project-status.svelte';
	import Requirement from '$lib/ui/components/requirement.svelte';
	import Task from '$lib/ui/components/task.svelte';
	import { Plus } from '@lucide/svelte';

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
			status: 'COMPLETED'
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

<section class="space-y-6">
	<div class="space-y-2">
		<h1>Lorem ipsum dolor sit amet</h1>

		<p class="text-lg">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
	</div>

	<ProjectStatus {...project} />
</section>

<section class="space-y-4">
	<div>
		<h2>Requisitos</h2>
		<p>O projeto deve atender aos seguintes requisitos:</p>
	</div>

	<div class="space-y-2">
		<ul class="space-y-1.5">
			{#each requirements as requirement}
				<li>
					<Requirement {...requirement} />
				</li>
			{/each}
		</ul>

		<button class="btn">
			<Plus />
			Adicionar requisito
		</button>
	</div>
</section>

<section class="space-y-4">
	<div>
		<h2>Tarefas</h2>
		<p>As tarefas do projeto são as seguintes:</p>
	</div>

	<div class="space-y-2">
		<ul class="space-y-1.5">
			{#each tasks as task}
				<li>
					<Task {...task} />
				</li>
			{/each}
		</ul>

		<button class="btn">
			<Plus />
			Adicionar tarefa
		</button>
	</div>
</section>
