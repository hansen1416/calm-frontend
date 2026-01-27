<script lang="ts">
	import { onMount } from "svelte";
	import { mode } from "mode-watcher";
	import { goto } from "$app/navigation";
	import "@xyflow/svelte/dist/style.css";
	import {
		SvelteFlow,
		Background,
		Controls,
		MiniMap,
		addEdge,
	} from "@xyflow/svelte";
	import type {
		Node,
		Edge,
		Connection,
		Viewport,
		ColorMode,
	} from "@xyflow/svelte";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import * as Select from "$lib/components/ui/select";
	import { apiFetch } from "$lib/api";
	import type {
		PaginatedContactsResponse,
		PaginatedGroupsResponse,
	} from "$lib/types";
	import EmailNode from "$lib/workflow/nodes/EmailNode.svelte";

	const nodeTypes = { email: EmailNode };

	// passed in from route
	let { campaignId }: { campaignId: string | null } = $props();

	let nodes = $state.raw<Node[]>([]);
	let edges = $state.raw<Edge[]>([]);
	let viewport = $state.raw<Viewport>({ x: 0, y: 0, zoom: 1 });
	let campaignName = $state("Untitled campaign");
	let audienceMode = $state<"include" | "exclude">("include");
	let audienceKind = $state<"contact" | "group" | "">("contact");
	let audienceEntityId = $state<string>("");

	let contactsResponse = $state<PaginatedContactsResponse>({
		current_page: 0,
		data: [],
		from: null,
		last_page: 0,
		per_page: 0,
		to: null,
		total: 0,
	});
	let groupsResponse = $state<PaginatedGroupsResponse>({
		current_page: 0,
		data: [],
		from: null,
		last_page: 0,
		per_page: 0,
		to: null,
		total: 0,
	});

	const onConnect = (c: Connection) => (edges = addEdge(c, edges));

	const addEmailNode = () => {
		const id = crypto.randomUUID();
		nodes = [
			...nodes,
			{
				id,
				type: "email",
				position: { x: 80, y: 260 },
				data: {
					label: "New email",
					subject: "Subject…",
					preview: "Preview…",
				},
			},
		];
	};

	const loadGraph = async () => {
		if (!campaignId) return;
		const res = await apiFetch(`api/email-campaigns/${campaignId}/graph`);
		if (!res.ok) throw new Error(await res.text());
		const g = await res.json();

		const graph_json = g.graph_json ?? {
			nodes: [],
			edges: [],
			viewport: viewport,
		};
		nodes = graph_json.nodes ?? [];
		edges = graph_json.edges ?? [];
		viewport = graph_json.viewport ?? viewport;
		campaignName = g.name ?? campaignName;
		audienceMode = g.mode ?? audienceMode;
		audienceKind = g.kind ?? audienceKind;
		audienceEntityId =
			g.entity_id === null || g.entity_id === undefined
				? ""
				: String(g.entity_id);
	};

	const fetchContacts = async () => {
		const res = await apiFetch(`api/contacts`, {
			method: "GET",
		});

		if (!res.ok) {
			return;
		}

		contactsResponse = await res.json();
	};

	const fetchGroups = async () => {
		const res = await apiFetch(`api/groups`, {
			method: "GET",
		});

		if (!res.ok) {
			return;
		}

		groupsResponse = await res.json();
	};

	const saveGraph = async () => {
		const payload = { nodes, edges, viewport };
		const trimmedEntityId = audienceEntityId.trim();
		const parsedEntityId =
			trimmedEntityId === "" ? NaN : Number(trimmedEntityId);
		const entityIdValue = Number.isNaN(parsedEntityId)
			? null
			: parsedEntityId;

		// existing campaign: PUT graph
		if (campaignId) {
			const res = await apiFetch(
				`api/email-campaigns/${campaignId}/graph`,
				{
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify({
						graph_json: payload,
						name: campaignName,
						mode: audienceMode,
						kind: audienceKind,
						entity_id: entityIdValue,
					}),
				},
			);
			if (!res.ok) throw new Error(await res.text());
			return;
		}

		// new campaign: POST create + store graph; backend returns { id }
		const res = await apiFetch(`api/email-campaigns`, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				name: campaignName,
				graph_json: payload,
				mode: audienceMode,
				kind: audienceKind,
				entity_id: entityIdValue,
			}),
		});
		if (!res.ok) throw new Error(await res.text());
		const created = await res.json();

		// navigate to /campaigns/{id}
		// location.href = `/campaigns/${created.id}`;
		await goto(`/campaigns/${created.id}`);
	};

	// Svelte 5: load once (or when campaignId changes)
	$effect(() => {
		loadGraph();
	});

	onMount(() => {
		void fetchContacts();
		void fetchGroups();
	});
</script>

<div class="toolbar">
	<Input
		bind:value={campaignName}
		placeholder="Campaign name"
		aria-label="Campaign name"
	/>
	<Select.Root bind:value={audienceMode}>
		<Select.Trigger class="select-input" aria-label="Audience mode">
			<span data-slot="select-value">
				{audienceMode === "include" ? "Include" : "Exclude"}
			</span>
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="include">Include</Select.Item>
			<Select.Item value="exclude">Exclude</Select.Item>
		</Select.Content>
	</Select.Root>
	<Select.Root bind:value={audienceKind}>
		<Select.Trigger class="select-input" aria-label="Audience kind">
			<span data-slot="select-value">
				{audienceKind === "group"
					? "Group"
					: audienceKind === "contact"
						? "Contact"
						: "Select kind"}
			</span>
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="contact">Contact</Select.Item>
			<Select.Item value="group">Group</Select.Item>
		</Select.Content>
	</Select.Root>
	<Select.Root bind:value={audienceEntityId} disabled={!audienceKind}>
		<Select.Trigger class="select-input" aria-label="Audience entity">
			<span data-slot="select-value">
				{audienceEntityId ? audienceEntityId : "Select entity"}
			</span>
		</Select.Trigger>
		<Select.Content>
			<Select.Item value="">Select entity</Select.Item>
		</Select.Content>
	</Select.Root>
	<Button onclick={addEmailNode}>Add Email</Button>
	<Button onclick={saveGraph}>Save</Button>
</div>

<div class="canvas">
	<SvelteFlow
		bind:nodes
		bind:edges
		bind:viewport
		{nodeTypes}
		fitView
		onconnect={onConnect}
		class={mode.current === "dark" ? "dark" : ""}
	>
		<Background />
		<Controls />
		<MiniMap />
	</SvelteFlow>
</div>

<style>
	.toolbar {
		display: flex;
		gap: 8px;
		align-items: center;
		margin-bottom: 8px;
		flex-wrap: wrap;
	}
	.toolbar :global(input) {
		max-width: 320px;
	}
	.select-input {
		border: 1px solid hsl(var(--input));
		background: hsl(var(--background));
		color: hsl(var(--foreground));
		border-radius: 6px;
		height: 36px;
		padding: 0 12px;
		font-size: 0.875rem;
		line-height: 1.25rem;
		min-width: 140px;
	}
	.select-input:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.canvas {
		width: 100%;
		height: 80vh;
	}
</style>
