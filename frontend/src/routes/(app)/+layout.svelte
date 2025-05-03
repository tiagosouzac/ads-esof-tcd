<script>
	import Header from '$lib/ui/sections/header.svelte';

	const { children } = $props();
</script>

<Header />

<main class="py-6">
	{@render children()}
</main>
