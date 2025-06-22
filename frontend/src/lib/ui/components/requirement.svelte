<script>
	import { Edit } from '@lucide/svelte';
	import Status from './status.svelte';
	import RequirementForm from '../sections/requirement-form.svelte';
	import { UserService } from '$lib/services/user';

	let { requirement, form, user } = $props();

	const canEditRequirements = UserService.isArchitect(user);

	let isEditing = $state(false);

	function toggleEdit() {
		if (!canEditRequirements) return;
		isEditing = !isEditing;
	}
</script>

{#if !isEditing}
	<button
		class="group relative w-full cursor-pointer rounded-md border p-6 text-left transition-colors duration-200 {canEditRequirements
			? 'hover:bg-neutral-50'
			: ''}"
		onclick={toggleEdit}
	>
		<div class="space-y-4">
			<div class="space-y-1">
				<strong>{requirement.title}</strong>
				<p class="text-sm">{requirement.description}</p>
			</div>

			<div class="flex flex-wrap items-center gap-x-6 gap-y-2">
				<Status status={requirement.status} />
			</div>
		</div>

		{#if canEditRequirements}
			<Edit
				class="absolute right-3 top-3 size-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
			/>
		{/if}
	</button>
{:else}
	<div class="space-y-4 rounded-md border p-6">
		<div>
			<h3>Editar requisito</h3>

			<p>
				Atualize os detalhes do requisito nos campos abaixo. Lembre-se de salvar as alterações ao
				final do formulário.
			</p>
		</div>

		<RequirementForm {requirement} closeForm={toggleEdit} {form} />
	</div>
{/if}
