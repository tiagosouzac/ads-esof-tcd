<script>
	import { CheckSquare } from '@lucide/svelte';
	import Status from './status.svelte';

	const { status, tasks, requirements } = $props();
</script>

<div class="flex flex-wrap items-center gap-x-6 gap-y-2">
	<Status {status} />

	<span class="flex items-center gap-2 text-sm">
		<CheckSquare class="size-4" />
		{requirements.completed} / {requirements.total} requisitos alcançados
	</span>

	<span class="flex items-center gap-2 text-sm">
		<CheckSquare class="size-4" />
		{tasks.completed} / {tasks.total} tarefas concluídas
	</span>
</div>
