<script>
	import { ChevronDown } from '@lucide/svelte';

	const { id, name, children } = $props();
</script>

<div class="relative">
	<select {id} {name}>
		{@render children()}
	</select>

	<ChevronDown class="absolute right-4 top-1/2 size-5 -translate-y-1/2" />
</div>
