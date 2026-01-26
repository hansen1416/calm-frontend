<script lang="ts">
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
	import EmailNode from "$lib/workflow/nodes/EmailNode.svelte";
	import { mode } from "mode-watcher";
	import { apiFetch } from "$lib/api";
	import { goto } from "$app/navigation";

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
</script>

<div class="toolbar">
	<Input
		bind:value={campaignName}
		placeholder="Campaign name"
		aria-label="Campaign name"
	/>
	<select
		class="select-input"
		bind:value={audienceMode}
		aria-label="Audience mode"
	>
		<option value="include">Include</option>
		<option value="exclude">Exclude</option>
	</select>
	<select
		class="select-input"
		bind:value={audienceKind}
		aria-label="Audience kind"
	>
		<option value="contact">Contact</option>
		<option value="group">Group</option>
	</select>
	<select
		class="select-input"
		bind:value={audienceEntityId}
		disabled={!audienceKind}
		aria-label="Audience entity"
	>
		<option value="">Select entity</option>
	</select>
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
