<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import * as NavigationMenu from "$lib/components/ui/navigation-menu";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="min-h-screen">
	<header class="h-14 border-b flex items-center px-4">
		<div class="font-semibold">Calm</div>
		<div class="ml-auto flex items-center gap-2">
			<NavigationMenu.Root>
				<NavigationMenu.List>
					<NavigationMenu.Item>
						<NavigationMenu.Link href="/contacts"
							>Contacts</NavigationMenu.Link
						>
					</NavigationMenu.Item>
					<NavigationMenu.Item>
						<NavigationMenu.Link href="/campaigns"
							>Campaigns</NavigationMenu.Link
						>
					</NavigationMenu.Item>
					<NavigationMenu.Item>
						<NavigationMenu.Link href="/profile"
							>Profile</NavigationMenu.Link
						>
					</NavigationMenu.Item>
					<NavigationMenu.Item>
						<NavigationMenu.Link href="/about"
							>About</NavigationMenu.Link
						>
					</NavigationMenu.Item>
				</NavigationMenu.List>
			</NavigationMenu.Root>
		</div>
	</header>

	<main class="flex-1 p-4">
		{@render children()}
	</main>
</div>
