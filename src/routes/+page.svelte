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

<nav>
	<ul>
		<li><a href="/">Home</a></li>
		<li><a href="/about">About</a></li>
		<li><a href="/campaigns/new">New Campaign</a></li>
		<li><a href="/campaigns/1">Campaign 1</a></li>
		<li><a href="/contacts">Contacts</a></li>
		<li><a href="/profile">Profile</a></li>
	</ul>
</nav>
