<script>
	import { LogOut } from '@lucide/svelte';

	const { user } = $props();
</script>

<div class="group relative">
	<div
		class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-medium text-indigo-600"
	>
		{user.name.at(0)}
	</div>

	<div class="absolute right-0 top-full hidden pt-2 group-hover:block">
		<div class="min-w-56 divide-y rounded-md border bg-white shadow-lg">
			<div class="p-2">
				<div class="flex items-center gap-2.5">
					<div
						class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-medium text-indigo-600"
					>
						{user.name.at(0)}
					</div>

					<div class="grid">
						<strong class="text-sm font-semibold leading-tight">{user.name}</strong>
						<span class="text-sm leading-tight text-neutral-600">{user.email}</span>
					</div>
				</div>
			</div>

			<div class="p-1">
				<a
					class="flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-neutral-600 transition-colors duration-200 hover:bg-red-50 hover:text-red-700"
					href="/logout"
				>
					<LogOut class="size-4" />
					Sair
				</a>
			</div>
		</div>
	</div>
</div>
