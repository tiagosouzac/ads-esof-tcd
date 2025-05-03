<script>
	import Logo from '$lib/ui/components/logo.svelte';
</script>

<div class="w-120 space-y-8 rounded-md border px-12 py-16">
	<Logo />

	<div class="space-y-4">
		<div class="space-y-1">
			<h1>Bem-vindo de volta!</h1>
			<p>Acesse sua conta para continuar gerenciando seus projetos com eficiência.</p>
		</div>

		<form>
			<div>
				<label for="email">E-mail <span class="text-red-700">*</span></label>
				<input id="email" name="email" type="email" placeholder="Digite seu e-mail cadastrado" />
			</div>

			<div>
				<label for="password">Senha <span class="text-red-700">*</span></label>
				<input id="password" name="password" type="password" placeholder="Digite sua senha" />
			</div>

			<button class="btn w-44" type="submit">Acessar conta</button>
		</form>
	</div>

	<div class="text-sm text-neutral-500">
		<span>Ainda não tem uma conta?</span>

		<a href="/sign-up">
			<strong>Cadastre-se</strong>
		</a>
	</div>
</div>
