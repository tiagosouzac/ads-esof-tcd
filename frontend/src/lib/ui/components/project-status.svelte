<script lang="ts">
	import { CheckSquare } from '@lucide/svelte';

	const { tasks = [], requirements = [] } = $props();

	const requirementsCompleted = requirements.filter((r) => r.status === 'COMPLETED').length;
	const tasksCompleted = tasks.filter((t) => t.status === 'COMPLETED').length;
</script>

<div class="flex flex-wrap items-center gap-x-6 gap-y-2">
	<span class="flex items-center gap-2 text-sm">
		<CheckSquare class="size-4" />
		{requirementsCompleted} / {requirements.length} requisitos alcançados
	</span>

	<span class="flex items-center gap-2 text-sm">
		<CheckSquare class="size-4" />
		{tasksCompleted} / {tasks.length} tarefas concluídas
	</span>
</div>
