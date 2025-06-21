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
			<h1>Bem-vindo ao Sistema!</h1>
			<p>
				Esta página é apenas para o primeiro acesso. Crie sua conta de administrador para gerenciar
				o sistema.
			</p>
			<p class="font-medium text-amber-600">
				Importante: Após criar o primeiro administrador, esta página não ficará mais acessível.
			</p>
		</div>

		<form method="POST" use:enhance>
			<Input
				id="name"
				name="name"
				type="text"
				placeholder="Ex.: Tiago Souza"
				label="Nome completo"
				error={form?.errors?.name?.[0]}
				required
				value={form?.data?.name}
			/>

			<Input
				id="email"
				name="email"
				type="email"
				placeholder="Ex.: seuemail@exemplo.com"
				label="E-mail"
				error={form?.errors?.email?.[0]}
				required
				value={form?.data?.email}
			/>

			<Input
				id="password"
				name="password"
				type="password"
				placeholder="Crie uma senha segura"
				label="Senha"
				error={form?.errors?.password?.[0]}
				required
				minlength={8}
			/>

			<button class="btn w-44" type="submit">Criar conta de administrador</button>
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
		<span>Já tem uma conta?</span>

		<a href="/sign-in">
			<strong>Faça login</strong>
		</a>
	</div>
</div>
