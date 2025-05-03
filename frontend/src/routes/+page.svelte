<script>
	import Project from '$lib/ui/components/project.svelte';
	import { Plus } from '@lucide/svelte';

	const projects = [
		{
			title: 'Lorem ipsum dolor sit amet',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			url: 'https://example.com/project1',
			status: 'IN_PROGRESS',
			tasks: {
				total: 10,
				completed: 3
			}
		},
		{
			title: 'Lorem ipsum dolor sit amet',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			url: 'https://example.com/project2',
			status: 'COMPLETED',
			tasks: {
				total: 10,
				completed: 10
			}
		},
		{
			title: 'Lorem ipsum dolor sit amet',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
			url: 'https://example.com/project3',
			status: 'PENDING',
			tasks: {
				total: 10,
				completed: 0
			}
		}
	];
</script>

<section class="container space-y-5">
	<div class="space-y-1">
		<h2 class="text-2xl font-bold">Projetos</h2>

		<p class="text-lg text-neutral-500">
			Esta é a lista de projetos que você criou para gerenciar os requisitos e repassá-los à sua
			equipe. Em cada projeto, você pode acompanhar o progresso, controlar as tarefas e atribuí-las
			aos membros da equipe.
		</p>
	</div>

	<div class="space-y-3">
		<ul class="space-y-2">
			{#each projects as project}
				<li>
					<a href={project.url} target="_blank" rel="noopener noreferrer">
						<Project {...project} />
					</a>
				</li>
			{/each}
		</ul>

		<a
			class="flex w-fit items-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-indigo-700"
			href="/create"
		>
			<Plus class="size-5" />
			Criar projeto
		</a>
	</div>
</section>
