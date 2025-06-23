<script>
	import { Check, Edit, X } from '@lucide/svelte';
	import Status from './status.svelte';
	import RequirementForm from '../sections/requirement-form.svelte';
	import { UserService } from '$lib/services/user';
	import { enhance } from '$app/forms';

	let { requirement, form, user } = $props();

	const canApproveRequirements = UserService.isManager(user);
	const canEditRequirements = UserService.isArchitect(user);

	let isEditing = $state(false);

	function toggleEdit() {
		if (!canEditRequirements) return;
		isEditing = !isEditing;
	}
</script>

{#if !isEditing}
	<div
		class="group relative w-full rounded-md border p-6 transition-colors duration-200 {canEditRequirements
			? 'hover:bg-neutral-50'
			: ''}"
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

		<div
			class="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
		>
			{#if canApproveRequirements}
				<form method="POST" use:enhance>
					<input type="hidden" name="requirementId" value={requirement.id} />

					<button
						class={[
							'cursor-pointer transition-colors duration-200 hover:text-green-600',
							requirement.isApproved === 'APPROVED' && 'text-green-600'
						]}
						formaction="?/approve-requirement"
					>
						<Check class="size-5" />
						<div class="sr-only">Aprovar</div>
					</button>
				</form>

				<form method="POST" use:enhance>
					<input type="hidden" name="requirementId" value={requirement.id} />

					<button
						class={[
							'cursor-pointer transition-colors duration-200 hover:text-red-600',
							requirement.isApproved === 'DISAPPROVED' && 'text-red-600'
						]}
						formaction="?/reject-requirement"
					>
						<X class="size-5 rotate-180" />
						<div class="sr-only">Rejeitar</div>
					</button>
				</form>
			{/if}

			{#if canEditRequirements}
				<button class="cursor-pointer" onclick={toggleEdit}>
					<Edit class="size-5" />
				</button>
			{/if}
		</div>
	</div>
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
