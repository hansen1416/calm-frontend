<script>
	import { onMount } from "svelte";
	import { apiFetch } from "$lib/api";

	let data = null;

	onMount(async () => {
		// Note: Do NOT use port 5173 here. Use localhost (port 80).
		const response = await apiFetch("api/ping");
		data = await response.json();

		console.log(data);
	});
</script>

<main class="flex min-h-[70vh] items-center justify-center px-6 py-12">
	<div class="grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
		<a
			href="/contacts"
			class="group flex min-h-[220px] flex-col justify-between rounded-2xl border border-border bg-card p-8 text-foreground shadow-sm transition hover:-translate-y-1 hover:shadow-md"
		>
			<div class="space-y-3">
				<p
					class="text-sm uppercase tracking-[0.2em] text-muted-foreground"
				>
					Contacts
				</p>
				<h2 class="text-2xl font-semibold">Contacts</h2>
				<p class="text-sm text-muted-foreground">
					Manage your subscribers, tags, and list health.
				</p>
			</div>
			<span
				class="text-sm font-medium text-primary group-hover:underline"
			>
				View contacts →
			</span>
		</a>

		<div
			class="flex min-h-[220px] flex-col justify-between rounded-2xl border border-dashed border-border bg-muted/40 p-8 text-foreground"
		>
			<div class="space-y-3">
				<p
					class="text-sm uppercase tracking-[0.2em] text-muted-foreground"
				>
					Projects
				</p>
				<h2 class="text-2xl font-semibold">Projects</h2>
				<p class="text-sm text-muted-foreground">Coming soon.</p>
			</div>
		</div>

		<a
			href="/campaigns"
			class="group flex min-h-[220px] flex-col justify-between rounded-2xl border border-border bg-card p-8 text-foreground shadow-sm transition hover:-translate-y-1 hover:shadow-md"
		>
			<div class="space-y-3">
				<p
					class="text-sm uppercase tracking-[0.2em] text-muted-foreground"
				>
					Email Campaign
				</p>
				<h2 class="text-2xl font-semibold">Email Campaign</h2>
				<p class="text-sm text-muted-foreground">
					Build and track automated campaign flows.
				</p>
			</div>
			<span
				class="text-sm font-medium text-primary group-hover:underline"
			>
				View campaigns →
			</span>
		</a>
	</div>
</main>
