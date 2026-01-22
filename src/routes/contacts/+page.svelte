<script>
	import { Button } from "$lib/components/ui/button";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from "$lib/components/ui/card";
	import {
		Collapsible,
		CollapsibleContent,
		CollapsibleTrigger,
	} from "$lib/components/ui/collapsible";

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
		<Collapsible class="add-collapsible">
			<CollapsibleTrigger class="add-trigger">
				<Button class="add-button">+ Add contact</Button>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<form class="add-form">
					<div class="form-row">
						<label for="contact-name">Full name</label>
						<input
							id="contact-name"
							name="contact-name"
							type="text"
							placeholder="Enter name"
						/>
					</div>
					<div class="form-row">
						<label for="contact-company">Company</label>
						<input
							id="contact-company"
							name="contact-company"
							type="text"
							placeholder="Enter company"
						/>
					</div>
					<div class="form-row">
						<label for="contact-email">Email address</label>
						<input
							id="contact-email"
							name="contact-email"
							type="email"
							placeholder="name@company.com"
						/>
					</div>
					<div class="form-actions">
						<Button type="submit">Save contact</Button>
						<Button type="reset" variant="outline">Clear</Button>
					</div>
				</form>
			</CollapsibleContent>
		</Collapsible>
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
		align-items: flex-start;
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

	:global(.add-collapsible) {
		display: flex;
		flex-direction: column;
		gap: 16px;
		min-width: 280px;
	}

	:global(.add-trigger) {
		display: inline-flex;
		justify-content: flex-end;
	}

	:global(.add-button) {
		box-shadow: 0 12px 24px rgba(15, 23, 42, 0.2);
	}

	.add-form {
		background: #fff;
		border-radius: 20px;
		border: 1px solid #e2e8f0;
		padding: 20px;
		display: grid;
		gap: 16px;
		box-shadow: 0 14px 30px rgba(15, 23, 42, 0.08);
	}

	.form-row {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	label {
		font-size: 13px;
		font-weight: 600;
		color: #475569;
	}

	input {
		border-radius: 12px;
		border: 1px solid #cbd5e1;
		padding: 10px 12px;
		font-size: 14px;
		font-family: inherit;
		background: #f8fafc;
	}

	input:focus {
		outline: 2px solid #1e293b;
		outline-offset: 1px;
		background: #fff;
	}

	.form-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
	}

	:global(.card-header) {
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
