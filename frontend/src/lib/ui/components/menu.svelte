<script>
	import { ClipboardPen, Plus } from '@lucide/svelte';
</script>

<nav>
	<ul class="flex items-center gap-4">
		<li>
			<a class="flex items-center gap-1.5 hover:text-neutral-900" href="/">
				<ClipboardPen class="size-5" />
				Projetos
			</a>
		</li>

		<li>
			<a class="flex items-center gap-1 hover:text-neutral-900" href="/create">
				<Plus class="size-5" />
				Criar projeto
			</a>
		</li>
	</ul>
</nav>
