<script>
	import Logo from '$lib/ui/components/logo.svelte';
</script>

<div class="w-120 space-y-8 rounded-md border px-12 py-16">
	<Logo />

	<div class="space-y-4">
		<div class="space-y-1">
			<h1>Bem-vindo!</h1>
			<p>Crie sua conta para começar a gerenciar seus projetos de forma eficiente.</p>
		</div>

		<form>
			<div>
				<label for="email">E-mail <span class="text-red-700">*</span></label>
				<input id="email" name="email" type="email" placeholder="Ex.: seuemail@exemplo.com" />
			</div>

			<div>
				<label for="password">Senha <span class="text-red-700">*</span></label>
				<input id="password" name="password" type="password" placeholder="Crie uma senha segura" />
			</div>

			<button class="btn w-44" type="submit">Criar conta</button>
		</form>
	</div>

	<div class="text-sm text-neutral-500">
		<span>Já tem uma conta?</span>

		<a href="/sign-in">
			<strong>Faça login</strong>
		</a>
	</div>
</div>
