<script>
	import { Edit, ExternalLink } from '@lucide/svelte';
	import PrototypeForm from '../sections/prototype-form.svelte';

	let { prototype, form } = $props();

	let isEditing = $state(false);

	function toggleEdit() {
		isEditing = !isEditing;
	}
</script>

{#if !isEditing}
	<div
		class="group relative w-full rounded-md border p-6 transition-colors duration-200 hover:bg-neutral-50"
	>
		<div class="space-y-4">
			<div class="space-y-1">
				<div class="flex items-center justify-between">
					<strong>{prototype.name}</strong>
					<div class="flex items-center gap-2">
						<a
							href={prototype.link}
							target="_blank"
							rel="noopener noreferrer"
							class="opacity-0 transition-opacity duration-200 hover:text-blue-600 group-hover:opacity-100"
							title="Abrir protótipo"
						>
							<ExternalLink class="size-4" />
						</a>
						<button
							class="opacity-0 transition-opacity duration-200 hover:text-blue-600 group-hover:opacity-100"
							onclick={toggleEdit}
							title="Editar protótipo"
						>
							<Edit class="size-4" />
						</button>
					</div>
				</div>
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
