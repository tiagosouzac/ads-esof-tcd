<script>
	import Logo from '../components/logo.svelte';
	import Menu from '../components/menu.svelte';
	import User from '../components/user.svelte';

	const { user } = $props();
</script>

<header class="container flex items-center justify-between py-5">
	<Logo />

	<div class="flex items-center gap-6">
		<Menu />
		<User {user} />
	</div>
</header>
