<script>
	const contacts = [
		{
			id: 1,
			name: "Alex Rivera",
			company: "Nimbus Labs",
			email: "alex@nimbuslabs.com",
		},
		{
			id: 2,
			name: "Priya Desai",
			company: "Brightpath Studio",
			email: "priya@brightpath.io",
		},
		{
			id: 3,
			name: "Marcus Chen",
			company: "Harbor Works",
			email: "marcus@harborworks.co",
		},
	];
</script>

<main class="page">
	<header class="page__header">
		<div>
			<p class="eyebrow">Contacts</p>
			<h1>Contact list</h1>
			<p class="subtitle">
				Keep track of your outreach and follow-ups in one place.
			</p>
		</div>
		<button class="primary">+ Add contact</button>
	</header>

	<section class="card">
		<div class="card__header">
			<h2>All contacts</h2>
			<span class="count">{contacts.length} total</span>
		</div>
		<ul class="contact-list">
			{#each contacts as contact}
				<li class="contact">
					<div class="contact__details">
						<h3>{contact.name}</h3>
						<p>{contact.company}</p>
						<a href={`mailto:${contact.email}`}>{contact.email}</a>
					</div>
					<button class="secondary">Operation</button>
				</li>
			{/each}
		</ul>
	</section>
</main>

<style>
	:global(body) {
		font-family:
			"Inter",
			system-ui,
			-apple-system,
			sans-serif;
		background: #f6f7fb;
		color: #1f2933;
	}

	.page {
		max-width: 920px;
		margin: 64px auto;
		padding: 0 24px 48px;
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.page__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		flex-wrap: wrap;
	}

	.eyebrow {
		text-transform: uppercase;
		letter-spacing: 0.12em;
		font-weight: 600;
		font-size: 12px;
		color: #7b8794;
		margin: 0 0 8px;
	}

	h1 {
		font-size: 32px;
		margin: 0 0 8px;
	}

	.subtitle {
		margin: 0;
		color: #52606d;
	}

	.primary {
		background: #4c6fff;
		color: #fff;
		border: none;
		border-radius: 999px;
		padding: 12px 24px;
		font-weight: 600;
		cursor: pointer;
		box-shadow: 0 10px 20px rgba(76, 111, 255, 0.2);
	}

	.primary:hover {
		background: #3c5afe;
	}

	.card {
		background: #fff;
		border-radius: 20px;
		padding: 24px;
		box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
	}

	.card__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 16px;
	}

	h2 {
		margin: 0;
		font-size: 20px;
	}

	.count {
		color: #7b8794;
		font-size: 14px;
	}

	.contact-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.contact {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 20px;
		border: 1px solid #e4e7eb;
		border-radius: 16px;
		gap: 16px;
		flex-wrap: wrap;
	}

	.contact__details h3 {
		margin: 0 0 4px;
		font-size: 18px;
	}

	.contact__details p {
		margin: 0 0 4px;
		color: #52606d;
	}

	.contact__details a {
		color: #1d4ed8;
		text-decoration: none;
	}

	.contact__details a:hover {
		text-decoration: underline;
	}

	.secondary {
		border: 1px solid #4c6fff;
		background: transparent;
		color: #4c6fff;
		padding: 8px 16px;
		border-radius: 999px;
		font-weight: 600;
		cursor: pointer;
	}

	.secondary:hover {
		background: #eef2ff;
	}
</style>
