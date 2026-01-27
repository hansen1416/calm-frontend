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
	<div class="event-handles">
		<div class="event-handle event-clicked">
			<span class="event-label">Clicked</span>
			<Handle
				type="source"
				position={Position.Right}
				id="clicked"
				style="position: relative;"
			/>
		</div>
		<div class="event-handle event-read">
			<span class="event-label">Read</span>
			<Handle
				type="source"
				position={Position.Right}
				id="read"
				style="position: relative;"
			/>
		</div>
	</div>
</div>

<style>
	.email-node {
		position: relative;
		min-width: 220px;
		padding: 10px 12px;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--card);
		color: var(--card-foreground);
	}
	.email-node.selected {
		outline: 2px solid var(--ring);
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

	.event-handles {
		position: absolute;
		right: -2px;
		top: 50%;
		transform: translateY(-50%);
	}
	.event-handle {
		position: absolute;
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: 11px;
		color: #4b5563;
	}
	.event-clicked {
		top: -16px;
	}
	.event-read {
		top: 16px;
	}
	.event-label {
		background: #f3f4f6;
		border-radius: 999px;
		padding: 2px 6px;
	}
</style>
