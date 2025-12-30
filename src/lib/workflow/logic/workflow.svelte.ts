// src/lib/workflow/logic/workflow.svelte.ts
import { type Node, type Edge, addEdge } from '@xyflow/svelte';
import { createHistory } from './history.svelte';

export class WorkflowEngine {
    // State initialization
    nodes = $state.raw<Node>();
    edges = $state.raw<Edge>();

    //... logic methods (addEmailNode, onConnect)
}

// Create a singleton instance if you want global state, 
// OR export the class to instantiate it inside a Context for per-page isolation.
export const workflow = new WorkflowEngine();