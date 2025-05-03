<script>
	import { Edit } from '@lucide/svelte';
	import Status from './status.svelte';
	import Select from './select.svelte';

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

		<form>
			<div>
				<label for="title">Título</label>

				<input
					id="title"
					name="title"
					type="text"
					placeholder="Digite o título do requisito"
					defaultValue={title}
				/>
			</div>

			<div>
				<label for="description">Descrição</label>

				<textarea
					id="description"
					name="description"
					rows="5"
					placeholder="Descreva os detalhes do requisito">{description}</textarea
				>
			</div>

			<div class="grid grid-cols-2 gap-2">
				<div>
					<label for="status">Status</label>

					<Select id="status" name="status">
						<option value="PENDING">Pendente</option>
						<option value="IN_PROGRESS">Em andamento</option>
						<option value="COMPLETED">Concluído</option>
					</Select>
				</div>
			</div>

			<div class="flex items-center gap-1.5">
				<button class="btn w-40" type="submit">Salvar alterações</button>
				<button class="btn-outline w-25" type="button" onclick={toggleEdit}>Cancelar</button>
			</div>
		</form>
	</div>
{/if}
