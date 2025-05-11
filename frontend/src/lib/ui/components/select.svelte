<script lang="ts">
	import { ChevronDown } from '@lucide/svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	const {
		label,
		error,
		options,
		selected,
		...props
	}: HTMLSelectAttributes & {
		label?: string;
		error?: string;
		options: Array<{ label: string; value: string }>;
		selected?: string;
	} = $props();

	function clearErrorOnInputChange(event: Event & { currentTarget: HTMLSelectElement }) {
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

	<div class="relative">
		<select {...props} onselect={clearErrorOnInputChange}>
			<option value=""></option>

			{#each options as { label, value }}
				<option {value} selected={value === selected}>
					{label}
				</option>
			{/each}
		</select>

		<ChevronDown class="absolute right-4 top-1/2 size-5 -translate-y-1/2" />
	</div>

	{#if error}
		<p class="text-sm text-red-600">{error}</p>
	{/if}
</div>
