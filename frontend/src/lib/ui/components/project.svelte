<script>
	import { CheckSquare } from '@lucide/svelte';

	let { title, description, status, tasks } = $props();
</script>

<div class="space-y-6 rounded-md border p-6 transition-colors duration-200 hover:bg-neutral-50">
	<div class="space-y-1">
		<h3>{title}</h3>
		<p class="line-clamp-3">{description}</p>
	</div>

	<div class="flex items-center gap-6">
		{#if status === 'PENDING'}
			<span class="flex items-center gap-2 text-sm">
				<div class="h-2 w-2 rounded-full bg-neutral-400"></div>
				Pendente
			</span>
		{:else if status === 'IN_PROGRESS'}
			<span class="flex items-center gap-2 text-sm">
				<div class="h-2 w-2 rounded-full bg-yellow-400"></div>
				Em andamento
			</span>
		{:else if status === 'COMPLETED'}
			<span class="flex items-center gap-2 text-sm">
				<div class="h-2 w-2 rounded-full bg-green-400"></div>
				Concluído
			</span>
		{/if}

		<span class="flex items-center gap-2 text-sm">
			<CheckSquare class="size-4" />
			{tasks.completed} / {tasks.total} tarefas
		</span>
	</div>
</div>
