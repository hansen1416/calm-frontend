<script lang="ts">
	import "./layout.css";
	import favicon from "$lib/assets/favicon.svg";
	import * as NavigationMenu from "$lib/components/ui/navigation-menu";
	import SunIcon from "@lucide/svelte/icons/sun";
	import MoonIcon from "@lucide/svelte/icons/moon";

	import { ModeWatcher, toggleMode } from "mode-watcher";
	import { Button } from "$lib/components/ui/button/index";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<ModeWatcher />

<div class="min-h-screen">
	<header class="h-14 border-b flex items-center px-4">
		<div class="font-semibold">
			<a href="/" class="font-semibold">Calm</a>
		</div>

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

			<!-- right-most theme toggle -->
			<div class="pl-2">
				<Button
					class="relative"
					onclick={toggleMode}
					variant="outline"
					size="icon"
				>
					<SunIcon
						class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 !transition-all dark:scale-0 dark:-rotate-90"
					/>
					<MoonIcon
						class="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 !transition-all dark:scale-100 dark:rotate-0"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
			</div>
		</div>
	</header>

	<main class="flex-1 p-4">
		{@render children()}
	</main>
</div>
