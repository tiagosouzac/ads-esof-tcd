<script>
	import { Plus } from '@lucide/svelte';
	import UserItem from '../components/user-item.svelte';
	import UserForm from './user-form.svelte';

	const { users = [], form } = $props();

	let creatingUser = $state(false);

	function toggleUserForm() {
		creatingUser = !creatingUser;
	}
</script>

<section class="space-y-4">
	<div>
		<h1>Usuários</h1>
		<p class="text-lg">Gerencie os usuários do sistema e seus níveis de acesso.</p>
	</div>

	<div class="space-y-2">
		{#if users.length === 0}
			{#if !creatingUser}
				<p class="rounded-md border px-6 py-12 text-center">
					Não há usuários cadastrados no sistema. Clique no botão abaixo para adicionar o primeiro
					usuário.
				</p>
			{/if}
		{:else}
			<ul class="space-y-1.5">
				{#each users as user}
					<li>
						<UserItem {user} {form} />
					</li>
				{/each}
			</ul>
		{/if}

		{#if creatingUser}
			<div class="space-y-4 rounded-md border p-6">
				<div>
					<h3>Adicionar usuário</h3>
					<p>Preencha os campos abaixo para adicionar um novo usuário ao sistema.</p>
				</div>

				<UserForm closeForm={toggleUserForm} {form} />
			</div>
		{/if}

		{#if !creatingUser}
			<button class="btn" onclick={toggleUserForm}>
				<Plus />
				Adicionar usuário
			</button>
		{/if}
	</div>
</section>
