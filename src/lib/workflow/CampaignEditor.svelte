<script lang="ts">
	import {
		SvelteFlow,
		Background,
		Controls,
		MiniMap,
		addEdge,
	} from "@xyflow/svelte";
	import type { Node, Edge, Connection, Viewport } from "@xyflow/svelte";
	import { Button } from "$lib/components/ui/button";
	import EmailNode from "$lib/workflow/nodes/EmailNode.svelte";
	import "@xyflow/svelte/dist/style.css";
	import { apiFetch } from "$lib/api";

	const nodeTypes = { email: EmailNode };

	// passed in from route
	let { campaignId }: { campaignId: string | null } = $props();

	let nodes = $state.raw<Node[]>([]);
	let edges = $state.raw<Edge[]>([]);
	let viewport = $state.raw<Viewport>({ x: 0, y: 0, zoom: 1 });

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
		nodes = g.nodes ?? [];
		edges = g.edges ?? [];
		viewport = g.viewport ?? viewport;
	};

	const saveGraph = async () => {
		const payload = { nodes, edges, viewport };

		// existing campaign: PUT graph
		if (campaignId) {
			const res = await apiFetch(
				`api/email-campaigns/${campaignId}/graph`,
				{
					method: "PUT",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(payload),
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
				name: "Untitled campaign",
				graph_json: payload,
			}),
		});
		if (!res.ok) throw new Error(await res.text());
		const created = await res.json();

		// navigate to /campaigns/{id}
		location.href = `/campaigns/${created.id}`;
	};

	// Svelte 5: load once (or when campaignId changes)
	$effect(() => {
		loadGraph();
	});
</script>

<div class="toolbar">
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
	>
		<Background />
		<Controls />
		<MiniMap />
	</SvelteFlow>
</div>

<style>
	.toolbar {
		margin-bottom: 8px;
	}
	.canvas {
		width: 100%;
		height: 80vh;
	}
</style>
