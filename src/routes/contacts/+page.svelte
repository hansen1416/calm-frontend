<script>
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card";

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

<main class="contacts-page">
	<header class="page-header">
		<div>
			<p class="eyebrow">Contacts</p>
			<h1>Contact list</h1>
			<p class="subtitle">
				Manage your outreach and keep follow-ups on track.
			</p>
		</div>
		<Button class="add-button">+ Add contact</Button>
	</header>

	<Card>
		<CardHeader class="card-header">
			<div>
				<CardTitle>All contacts</CardTitle>
				<CardDescription
					>{contacts.length} total contacts in this workspace.</CardDescription
				>
			</div>
			<span class="count">{contacts.length}</span>
		</CardHeader>
		<CardContent>
			<ul class="contact-list">
				{#each contacts as contact}
					<li class="contact-row">
						<div>
							<p class="contact-name">{contact.name}</p>
							<p class="contact-meta">{contact.company}</p>
							<a
								class="contact-link"
								href={`mailto:${contact.email}`}
								>{contact.email}</a
							>
						</div>
						<Button variant="outline" size="sm">Operation</Button>
					</li>
				{/each}
			</ul>
		</CardContent>
	</Card>
</main>

<style>
	:global(body) {
		font-family:
			"Inter",
			system-ui,
			-apple-system,
			sans-serif;
		background: #f8fafc;
		color: #0f172a;
	}

	.contacts-page {
		max-width: 960px;
		margin: 64px auto;
		padding: 0 24px 48px;
		display: flex;
		flex-direction: column;
		gap: 32px;
	}

	.page-header {
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
		color: #64748b;
		margin: 0 0 8px;
	}

	h1 {
		margin: 0 0 8px;
		font-size: 32px;
		font-weight: 700;
	}

	.subtitle {
		margin: 0;
		color: #475569;
	}

	.add-button {
		box-shadow: 0 12px 24px rgba(15, 23, 42, 0.2);
	}

	.card-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 16px;
	}

	.count {
		align-self: center;
		background: #e2e8f0;
		color: #1e293b;
		padding: 6px 12px;
		border-radius: 999px;
		font-weight: 600;
	}

	.contact-list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	.contact-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		padding: 16px 18px;
		border-radius: 16px;
		border: 1px solid #e2e8f0;
		background: #f8fafc;
	}

	.contact-name {
		margin: 0;
		font-size: 16px;
		font-weight: 600;
	}

	.contact-meta {
		margin: 4px 0;
		color: #64748b;
		font-size: 14px;
	}

	.contact-link {
		color: #2563eb;
		text-decoration: none;
		font-size: 14px;
	}

	.contact-link:hover {
		text-decoration: underline;
	}
</style>
