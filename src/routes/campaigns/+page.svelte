<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card";
	import { Badge } from "$lib/components/ui/badge";
	import type { PaginatedEmailCampaignsResponse } from "$lib/types";
	import { apiFetch } from "$lib/api";

	let campaignsResponse: PaginatedEmailCampaignsResponse = {
		current_page: 0,
		data: [],
		from: 0,
		last_page: 0,
		per_page: 0,
		to: 0,
		total: 0,
	};

	const fetchCampaigns = async () => {
		const res = await apiFetch(`api/email-campaigns`, {
			method: "GET",
		});

		if (!res.ok) {
			return;
		}

		campaignsResponse = await res.json();
	};

	onMount(fetchCampaigns);
</script>

<main class="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pb-12 pt-14">
	<header class="flex flex-wrap items-start justify-between gap-6">
		<div class="space-y-2">
			<h1 class="text-3xl font-semibold tracking-tight">
				Email campaigns
			</h1>
			<p class="text-sm text-muted-foreground">
				Track drafts, scheduled sends, and active automation flows.
			</p>
		</div>
		<Button
			onclick={() => {
				goto(`/campaigns/new`);
			}}
		>
			New campaign
		</Button>
	</header>

	<Card>
		<CardHeader
			class="flex flex-row flex-wrap items-start justify-between gap-4"
		>
			<div class="space-y-1">
				<CardTitle>All campaigns</CardTitle>
				<CardDescription>
					{campaignsResponse.total} total campaigns in this workspace.
				</CardDescription>
			</div>
			<span
				class="rounded-full bg-muted px-3 py-1 text-sm font-semibold text-foreground"
			>
				{campaignsResponse.total}
			</span>
		</CardHeader>
		<CardContent>
			<ul class="space-y-3">
				{#each campaignsResponse.data as campaign}
					<li
						class="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-muted px-5 py-4"
					>
						<div class="space-y-1">
							<p class="text-base font-semibold">
								{campaign.name}
							</p>
							<p class="text-sm text-muted-foreground">
								{campaign.kind} • {campaign.mode} • Entity{" "}
								{campaign.entity_id}
							</p>
						</div>
						<div class="flex flex-wrap items-center gap-2">
							<Badge variant="secondary">
								{campaign.status}
							</Badge>
						</div>
					</li>
				{/each}
			</ul>
		</CardContent>
	</Card>
</main>
