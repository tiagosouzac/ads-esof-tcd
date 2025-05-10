<script>
	import Header from '$lib/ui/sections/header.svelte';

	const { data, children } = $props();
</script>

<Header user={data.user} />

<main class="container space-y-11 py-6">
	{@render children()}
</main>
