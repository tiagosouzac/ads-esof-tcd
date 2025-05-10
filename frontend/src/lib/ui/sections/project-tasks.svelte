<script>
	import { Plus } from '@lucide/svelte';
	import Task from '../components/task.svelte';
	import TaskForm from './task-form.svelte';

	const { tasks } = $props();

	let creatingTask = $state(false);

	function toggleTaskForm() {
		creatingTask = !creatingTask;
	}
</script>

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

		{#if creatingTask}
			<div class="space-y-4 rounded-md border p-6">
				<div>
					<h3>Adicionar tarefa</h3>
					<p>Preencha os campos abaixo para adicionar uma nova tarefa ao projeto.</p>
				</div>

				<TaskForm onsubmit={toggleTaskForm} oncancel={toggleTaskForm} />
			</div>
		{/if}

		{#if !creatingTask}
			<button class="btn" onclick={toggleTaskForm}>
				<Plus />
				Adicionar tarefa
			</button>
		{/if}
	</div>
</section>
