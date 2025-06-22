<script>
	import { ClipboardPen, Plus, Users } from '@lucide/svelte';
	import { UserService } from '$lib/services/user';

	const { user } = $props();
	const isAdmin = UserService.isManager(user);
</script>

<nav>
	<ul class="flex items-center gap-4">
		<li>
			<a class="flex items-center gap-1.5 hover:text-neutral-900" href="/">
				<ClipboardPen class="size-5" />
				Projetos
			</a>
		</li>

		{#if isAdmin}
			<li>
				<a class="flex items-center gap-1 hover:text-neutral-900" href="/project/create">
					<Plus class="size-5" />
					Criar projeto
				</a>
			</li>

			<li>
				<a class="flex items-center gap-1.5 hover:text-neutral-900" href="/admin/users">
					<Users class="size-5" />
					Usuários
				</a>
			</li>
		{/if}
	</ul>
</nav>
