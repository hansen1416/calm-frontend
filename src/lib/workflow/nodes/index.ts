// src/lib/workflow/nodes/index.ts
import EmailNode from './EmailNode.svelte';

// This object is passed to the <SvelteFlow> 'nodeTypes' prop
export const nodeTypes = {
    emailNode: EmailNode
};