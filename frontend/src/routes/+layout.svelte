<script lang="ts">
	import '@fontsource-variable/inter';
	import '../app.css';

	import Header from '$lib/ui/sections/header.svelte';

	let { children } = $props();
</script>

<Header />

<main class="py-6">
	{@render children()}
</main>
