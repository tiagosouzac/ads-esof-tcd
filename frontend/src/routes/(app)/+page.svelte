<script>
	import Project from '$lib/ui/components/project.svelte';
	import { Plus } from '@lucide/svelte';

	const { data } = $props();
</script>

<section class="space-y-5">
	<div class="space-y-1">
		<h1>Projetos</h1>

		<p class="text-lg text-neutral-500">
			Esta é a lista de projetos que você criou para gerenciar os requisitos e repassá-los à sua
			equipe. Em cada projeto, você pode acompanhar o progresso, controlar as tarefas e atribuí-las
			aos membros da equipe.
		</p>
	</div>

	<div class="space-y-3">
		{#if data.projects.length === 0}
			<p class="rounded-md border px-6 py-12 text-center">
				Você ainda não criou nenhum projeto. Clique no botão abaixo para criar seu primeiro projeto
				e gerenciar seus requisitos de forma eficiente.
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
	</div>
</section>
