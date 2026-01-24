<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen">
	<header class="h-14 border-b flex items-center px-4">
		<div class="font-semibold">Calm</div>
		<div class="ml-auto flex items-center gap-2">
			<!-- global actions -->
		</div>
	</header>

	<main class="flex-1 p-4">
		{@render children()}
	</main>
</div>
