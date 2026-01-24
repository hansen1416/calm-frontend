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

<div>Home content</div>
