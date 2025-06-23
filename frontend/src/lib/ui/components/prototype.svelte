<script>
	import { Check, Edit, ExternalLink, X } from '@lucide/svelte';
	import PrototypeForm from '../sections/prototype-form.svelte';
	import { UserService } from '$lib/services/user';
	import { enhance } from '$app/forms';

	let { prototype, form, user } = $props();

	const canEditPrototypes = UserService.isDesigner(user);
	const canApprovePrototypes = UserService.isManager(user);

	let isEditing = $state(false);

	function toggleEdit() {
		if (!canEditPrototypes) return;
		isEditing = !isEditing;
	}
</script>

{#if !isEditing}
	<div
		class="group relative w-full rounded-md border p-6 transition-colors duration-200 {canEditPrototypes
			? 'hover:bg-neutral-50'
			: ''}"
	>
		<div class="space-y-4">
			<div class="space-y-1">
				<strong class="block">{prototype.name}</strong>

				<a
					href={prototype.link}
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm text-blue-600 hover:underline"
				>
					{prototype.link}
				</a>
			</div>
		</div>

		<div
			class="absolute right-3 top-3 flex items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
		>
			{#if canApprovePrototypes}
				<form method="POST" use:enhance>
					<input type="hidden" name="prototypeId" value={prototype.id} />

					<button
						class={[
							'cursor-pointer transition-colors duration-200 hover:text-green-600',
							prototype.isApproved === 'APPROVED' && 'text-green-600'
						]}
						formaction="?/approve-prototype"
					>
						<Check class="size-5" />
						<div class="sr-only">Aprovar</div>
					</button>
				</form>

				<form method="POST" use:enhance>
					<input type="hidden" name="prototypeId" value={prototype.id} />

					<button
						class={[
							'cursor-pointer transition-colors duration-200 hover:text-red-600',
							prototype.isApproved === 'DISAPPROVED' && 'text-red-600'
						]}
						formaction="?/reject-prototype"
					>
						<X class="size-5 rotate-180" />
						<div class="sr-only">Rejeitar</div>
					</button>
				</form>
			{/if}

			<a
				href={prototype.link}
				target="_blank"
				rel="noopener noreferrer"
				class=" hover:text-blue-600"
				title="Abrir protótipo"
			>
				<ExternalLink class="size-5" />
			</a>

			{#if canEditPrototypes}
				<button class="hover:text-blue-600" onclick={toggleEdit} title="Editar protótipo">
					<Edit class="size-5" />
				</button>
			{/if}
		</div>
	</div>
{:else}
	<div class="space-y-4 rounded-md border p-6">
		<div>
			<h3>Editar protótipo</h3>

			<p>
				Atualize o link do protótipo no campo abaixo. Lembre-se de salvar as alterações ao final do
				formulário.
			</p>
		</div>

		<PrototypeForm {prototype} {form} closeForm={toggleEdit} />
	</div>
{/if}
