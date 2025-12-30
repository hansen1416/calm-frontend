<script lang="ts">
	import { Handle, Position, type NodeProps } from "@xyflow/svelte";

	// Svelte 5: NodeProps comes via $props()
	let { data, selected }: NodeProps = $props();
</script>

<div class="email-node" class:selected>
	<div class="title">{data.label ?? "Email"}</div>

	<div class="row">
		<span class="k">Subject</span><span class="v"
			>{data.subject ?? "(none)"}</span
		>
	</div>
	<div class="preview">{data.preview ?? ""}</div>

	<!-- inbound / outbound -->
	<Handle type="target" position={Position.Left} id="in" />
	<Handle type="source" position={Position.Right} id="out" />
</div>

<style>
	.email-node {
		min-width: 220px;
		padding: 10px 12px;
		border: 1px solid #d7d7d7;
		border-radius: 12px;
		background: #fff;
	}
	.email-node.selected {
		outline: 2px solid #222;
	}
	.title {
		font-weight: 650;
		margin-bottom: 6px;
	}
	.row {
		display: flex;
		gap: 8px;
		font-size: 12px;
	}
	.k {
		opacity: 0.65;
		width: 52px;
	}
	.v {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		flex: 1;
	}
	.preview {
		margin-top: 6px;
		font-size: 12px;
		opacity: 0.8;
	}
</style>
