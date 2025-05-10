<script>
	import { Edit } from '@lucide/svelte';
	import Status from './status.svelte';
	import RequirementForm from '../sections/requirement-form.svelte';

	let { title, description, status } = $props();

	let isEditing = $state(false);

	function toggleEdit() {
		isEditing = !isEditing;
	}
</script>

{#if !isEditing}
	<button
		class="group relative w-full cursor-pointer rounded-md border p-6 text-left transition-colors duration-200 hover:bg-neutral-50"
		onclick={toggleEdit}
	>
		<div class="space-y-4">
			<div class="space-y-1">
				<strong>{title}</strong>
				<p class="text-sm">{description}</p>
			</div>

			<div class="flex flex-wrap items-center gap-x-6 gap-y-2">
				<Status {status} />
			</div>
		</div>

		<Edit
			class="absolute right-3 top-3 size-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
		/>
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

		<RequirementForm
			requirement={{ title, description, status }}
			onsubmit={toggleEdit}
			oncancel={toggleEdit}
		/>
	</div>
{/if}
