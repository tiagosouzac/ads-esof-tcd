<script>
	import { enhance } from '$app/forms';
	import Input from '$lib/ui/components/input.svelte';
	import Logo from '$lib/ui/components/logo.svelte';
	import { CircleX } from '@lucide/svelte';

	const { form } = $props();
</script>

<div class="w-120 space-y-8 rounded-md border px-12 py-16">
	<Logo />

	<div class="space-y-4">
		<div class="space-y-1">
			<h1>Bem-vindo de volta!</h1>
			<p>Acesse sua conta para continuar gerenciando seus projetos com eficiência.</p>
		</div>

		<form method="POST" use:enhance>
			<Input
				id="email"
				name="email"
				type="email"
				placeholder="Digite seu e-mail cadastrado"
				label="E-mail"
				error={form?.errors?.email?.[0]}
				required
				value={form?.data?.email}
			/>

			<Input
				id="password"
				name="password"
				type="password"
				placeholder="Digite sua senha"
				label="Senha"
				error={form?.errors?.password?.[0]}
				required
			/>

			<button class="btn w-44" type="submit">Acessar conta</button>
		</form>

		{#if form?.errors.form}
			<div class="flex items-center gap-2.5 rounded-md bg-red-50 p-3 text-sm text-red-800">
				{#each form.errors.form as error}
					<CircleX class="size-6 shrink-0" strokeWidth={1.5} />
					<span class="leading-tight">{error}</span>
				{/each}
			</div>
		{/if}
	</div>

	<div class="text-sm text-neutral-500">
		<span>Ainda não tem uma conta?</span>

		<a href="/sign-up">
			<strong>Cadastre-se</strong>
		</a>
	</div>
</div>
