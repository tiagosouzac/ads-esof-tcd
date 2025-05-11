<script>
	import { Plus } from '@lucide/svelte';
	import Requirement from '../components/requirement.svelte';
	import RequirementForm from './requirement-form.svelte';

	const { requirements = [], form } = $props();

	let creatingRequirement = $state(false);

	function toggleRequirementForm() {
		creatingRequirement = !creatingRequirement;
	}
</script>

<section class="space-y-4">
	<div>
		<h2>Requisitos</h2>
		<p>O projeto deve atender aos seguintes requisitos:</p>
	</div>

	<div class="space-y-2">
		{#if requirements.length === 0}
			{#if !creatingRequirement}
				<p class="rounded-md border px-6 py-12 text-center">
					Você ainda não cadastrou nenhum requisito para este projeto. Clique no botão abaixo para
					adicionar o primeiro requisito.
				</p>
			{/if}
		{:else}
			<ul class="space-y-1.5">
				{#each requirements as requirement}
					<li>
						<Requirement {requirement} {form} />
					</li>
				{/each}
			</ul>
		{/if}

		{#if creatingRequirement}
			<div class="space-y-4 rounded-md border p-6">
				<div>
					<h3>Adicionar requisito</h3>
					<p>Preencha os campos abaixo para adicionar um novo requisito ao projeto.</p>
				</div>

				<RequirementForm closeForm={toggleRequirementForm} {form} />
			</div>
		{/if}

		{#if !creatingRequirement}
			<button class="btn" onclick={toggleRequirementForm}>
				<Plus />
				Adicionar requisito
			</button>
		{/if}
	</div>
</section>
