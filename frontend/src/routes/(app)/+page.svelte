<script>
	import Project from '$lib/ui/components/project.svelte';
	import { Plus } from '@lucide/svelte';

	const { data } = $props();
</script>

<section class="space-y-3">
	<h1>Projetos</h1>

	{#if data.projects.length === 0}
		<p class="rounded-md border px-6 py-12 text-center">
			Você ainda não criou nenhum projeto. Clique no botão abaixo para criar seu primeiro projeto e
			gerenciar seus requisitos de forma eficiente.
		</p>
	{:else}
		<ul class="space-y-2">
			{#each data.projects as project}
				<li>
					<a href={`/project/${project.id}`}>
						<Project {...project} />
					</a>
				</li>
			{/each}
		</ul>
	{/if}

	<a class="btn w-44" href="/project/create">
		<Plus />
		Criar projeto
	</a>
</section>
