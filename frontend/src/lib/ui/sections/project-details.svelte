<script>
	import { Edit } from '@lucide/svelte';
	import ProjectStatus from '../components/project-status.svelte';

	const { project } = $props();
</script>

<section class="space-y-6">
	<div class="space-y-2">
		<h1>Lorem ipsum dolor sit amet</h1>

		<p class="text-lg">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
	</div>

	<div class="flex items-center justify-between">
		<ProjectStatus {...project} />

		<a class="flex items-center gap-1.5 hover:text-neutral-900" href="/project/1/edit">
			<Edit class="size-4" />
			<span class="text-sm">Editar projeto</span>
		</a>
	</div>
</section>
