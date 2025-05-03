<script>
	import { ClipboardPen, Plus } from '@lucide/svelte';
</script>

<nav>
	<ul class="flex items-center gap-4">
		<li>
			<a class="flex items-center gap-1.5 text-neutral-600 hover:text-black" href="/">
				<ClipboardPen class="size-5" />
				Projetos
			</a>
		</li>

		<li>
			<a class="flex items-center gap-1 text-neutral-600 hover:text-black" href="/create">
				<Plus class="size-5" />
				Criar projeto
			</a>
		</li>
	</ul>
</nav>
