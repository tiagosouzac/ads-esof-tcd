<script>
	const { status } = $props();
</script>

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
