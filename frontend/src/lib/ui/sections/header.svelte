<script>
	import Logo from '../components/logo.svelte';
	import Menu from '../components/menu.svelte';
	import User from '../components/user.svelte';
</script>

<header class="container flex items-center justify-between py-5">
	<Logo />

	<div class="flex items-center gap-6">
		<Menu />
		<User user={{ name: 'Tiago', email: 'tiago@mail.com' }} />
	</div>
</header>
