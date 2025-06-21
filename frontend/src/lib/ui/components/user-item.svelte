<script lang="ts">
	import { Edit, Mail } from '@lucide/svelte';
	import UserForm from '../sections/user-form.svelte';
	import { Role } from '$lib/models/user';

	let { user, form } = $props();

	let isEditing = $state(false);

	function toggleEdit() {
		isEditing = !isEditing;
	}

	function translateRole(role: Role) {
		const roles = {
			[Role.MANAGER]: 'Administrador',
			[Role.ARCHITECT]: 'Arquiteto',
			[Role.DESIGNER]: 'Designer',
			[Role.DEVELOPER]: 'Desenvolvedor',
			[Role.QUALITY_ANALYST]: 'Analista de Qualidade'
		};

		return roles[role] || role;
	}

	function getRoleBadgeColor(role: Role) {
		const colors = {
			[Role.MANAGER]: 'bg-red-100 text-red-800',
			[Role.ARCHITECT]: 'bg-purple-100 text-purple-800',
			[Role.DESIGNER]: 'bg-pink-100 text-pink-800',
			[Role.DEVELOPER]: 'bg-blue-100 text-blue-800',
			[Role.QUALITY_ANALYST]: 'bg-green-100 text-green-800'
		};

		return colors[role] || 'bg-gray-100 text-gray-800';
	}
</script>

{#if !isEditing}
	<button
		class="group relative w-full cursor-pointer rounded-md border p-6 text-left transition-colors duration-200 hover:bg-neutral-50"
		onclick={toggleEdit}
	>
		<div class="flex justify-between">
			<div class="space-y-2">
				<div>
					<strong class="text-lg">{user.name}</strong>
					<div class="flex items-center gap-1 text-sm text-neutral-600">
						<Mail class="size-4" />
						<span>{user.email}</span>
					</div>
				</div>
				<div>
					<span
						class="rounded-full px-2.5 py-0.5 text-xs font-medium {getRoleBadgeColor(user.role)}"
					>
						{translateRole(user.role)}
					</span>
				</div>
			</div>

			<Edit
				class="absolute right-3 top-3 size-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
			/>
		</div>
	</button>
{:else}
	<div class="space-y-4 rounded-md border p-6">
		<div>
			<h3>Editar usuário</h3>
			<p>
				Atualize as informações do usuário nos campos abaixo. Lembre-se de salvar as alterações ao
				final do formulário.
			</p>
		</div>

		<UserForm {user} {form} closeForm={toggleEdit} />
	</div>
{/if}
