<script>
	import { Plus } from '@lucide/svelte';
	import Prototype from '../components/prototype.svelte';
	import PrototypeForm from './prototype-form.svelte';
	import { UserService } from '$lib/services/user';

	const { prototypes = [], form, user } = $props();

	const canEditPrototypes = UserService.isDesigner(user);

	let creatingRequirement = $state(false);

	function togglePrototypeForm() {
		creatingRequirement = !creatingRequirement;
	}
</script>

<section class="space-y-4">
	<div>
		<h2>Protótipos</h2>
		<p>O projeto deve seguir os seguintes protótipos:</p>
	</div>

	<div class="space-y-2">
		{#if prototypes.length === 0}
			{#if !creatingRequirement}
				<p class="rounded-md border px-6 py-12 text-center">
					Você ainda não cadastrou nenhum protótipo para este projeto. Clique no botão abaixo para
					adicionar o primeiro protótipo.
				</p>
			{/if}
		{:else}
			<ul class="prototype-list space-y-1.5">
				{#each prototypes as prototype}
					<li>
						<Prototype {prototype} {form} {user} />
					</li>
				{/each}
			</ul>
		{/if}

		{#if creatingRequirement}
			<div class="space-y-4 rounded-md border p-6">
				<div>
					<h3>Adicionar protótipo</h3>
					<p>Preencha os campos abaixo para adicionar um novo protótipo ao projeto.</p>
				</div>

				<PrototypeForm closeForm={togglePrototypeForm} {form} />
			</div>
		{/if}

		{#if !creatingRequirement && canEditPrototypes}
			<button class="btn" onclick={togglePrototypeForm}>
				<Plus />
				Adicionar protótipo
			</button>
		{/if}
	</div>
</section>
