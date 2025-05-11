<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	const { label, error, ...props }: HTMLTextareaAttributes & { label?: string; error?: string } =
		$props();

	function clearErrorOnInputChange(event: Event & { currentTarget: HTMLTextAreaElement }) {
		if (error) {
			event.currentTarget.nextElementSibling?.remove();
		}
	}
</script>

<div class="space-y-1">
	{#if label}
		<label for={props.id}>
			{label}
			{#if props.required}
				<span class="text-red-700">*</span>
			{/if}
		</label>
	{/if}

	<textarea {...props} oninput={clearErrorOnInputChange}></textarea>

	{#if error}
		<p class="text-sm text-red-600">{error}</p>
	{/if}
</div>
