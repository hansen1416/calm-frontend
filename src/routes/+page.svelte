<script>
	import { onMount } from "svelte";

	let data = null;

	onMount(async () => {
		// Note: Do NOT use port 5173 here. Use localhost (port 80).
		const response = await fetch("http://localhost/api/ping");
		data = await response.json();

		console.log(data);
	});
</script>

<div>Home</div>
