<script lang="ts">
	import { onMount } from "svelte";
	import { Button, buttonVariants } from "$lib/components/ui/button";
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
	import { goto } from "$app/navigation";
	import { Label } from "$lib/components/ui/label";
	import { Textarea } from "$lib/components/ui/textarea";
	import * as Sheet from "$lib/components/ui/sheet";
	import {
		ToggleGroup,
		ToggleGroupItem,
	} from "$lib/components/ui/toggle-group";
	import type {
		PaginatedContactsResponse,
		PaginatedGroupsResponse,
	} from "$lib/types";
	import { apiFetch } from "$lib/api";

	const inputClass =
		"border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

	let contactsResponse: PaginatedContactsResponse = {
		current_page: 0,
		data: [],
		from: 0,
		last_page: 0,
		per_page: 0,
		to: 0,
		total: 0,
	};

	let groupsResponse: PaginatedGroupsResponse = {
		current_page: 0,
		data: [],
		from: 0,
		last_page: 0,
		per_page: 0,
		to: 0,
		total: 0,
	};

	let isSaving = false;
	let isGroupSheetOpen = false;
	let activeContactId: number | null = null;
	let selectedGroupsByContact: Record<number, string[]> = {};

	let formData = {
		name: "",
		description: "",
		email: "",
	};

	const fetchContacts = async () => {
		const res = await apiFetch(`api/contacts`, {
			method: "GET",
		});

		if (!res.ok) {
			return;
		}

		contactsResponse = await res.json();
	};

	const fetchGroups = async () => {
		const res = await apiFetch(`api/groups`, {
			method: "GET",
		});

		if (!res.ok) {
			return;
		}

		groupsResponse = await res.json();
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		isSaving = true;

		try {
			const res = await apiFetch(`api/contacts`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(formData),
			});

			if (!res.ok) {
				return;
			}

			handleReset();
			await fetchContacts();
		} finally {
			isSaving = false;
		}
	};

	const handleReset = () => {
		formData = {
			name: "",
			description: "",
			email: "",
		};
	};

	const openGroupSheet = (contactId: number) => {
		activeContactId = contactId;
		isGroupSheetOpen = true;
	};

	const handleGroupSelection = (
		contactId: number,
		value: string[] | string,
	) => {
		const nextValue = Array.isArray(value) ? value : value ? [value] : [];
		selectedGroupsByContact = {
			...selectedGroupsByContact,
			[contactId]: nextValue,
		};
	};

	$: activeContact = activeContactId
		? (contactsResponse.data.find(
				(contact) => contact.id === activeContactId,
			) ?? null)
		: null;

	$: activeContactGroups = activeContactId
		? (selectedGroupsByContact[activeContactId] ?? [])
		: [];

	onMount(() => {
		void fetchContacts();
		void fetchGroups();
	});

	const onEdit = (idx: number) => {
		console.log(idx);
	};

	const onDelete = (idx: number) => {
		console.log(idx);
	};
</script>

<main class="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pb-12 pt-14">
	<header class="flex flex-wrap items-start justify-between gap-6">
		<div class="space-y-2">
			<h1 class="text-3xl font-semibold tracking-tight">Contact list</h1>
			<p class="text-sm text-muted-foreground">
				Manage your outreach and keep follow-ups on track.
			</p>
		</div>
		<Button
			variant="outline"
			onclick={() => {
				goto(`/groups`);
			}}>Manage groups</Button
		>
		<Collapsible class="w-full max-w-sm">
			<CollapsibleTrigger
				class={buttonVariants({
					class: "w-full sm:w-auto",
				})}
			>
				+ Add contact
			</CollapsibleTrigger>
			<CollapsibleContent class="pt-4">
				<Card>
					<CardContent class="space-y-4 p-4">
						<form
							class="space-y-4"
							on:submit={handleSubmit}
							on:reset={handleReset}
						>
							<div class="space-y-2">
								<Label for="contact-name">Name</Label>
								<input
									id="contact-name"
									name="contact-name"
									type="text"
									placeholder="Enter name"
									class={inputClass}
									bind:value={formData.name}
								/>
							</div>
							<div class="space-y-2">
								<Label for="contact-description"
									>Description</Label
								>
								<Textarea
									id="contact-description"
									name="contact-description"
									placeholder="Add a short description"
									bind:value={formData.description}
								/>
							</div>
							<div class="space-y-2">
								<Label for="contact-email">Email</Label>
								<input
									id="contact-email"
									name="contact-email"
									type="email"
									placeholder="name@company.com"
									class={inputClass}
									bind:value={formData.email}
								/>
							</div>
							<div class="flex flex-wrap gap-2">
								<Button type="submit" disabled={isSaving}>
									{isSaving ? "Saving..." : "Save contact"}
								</Button>
								<Button type="reset" variant="outline">
									Clear
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>
			</CollapsibleContent>
		</Collapsible>
	</header>

	<Card>
		<CardHeader
			class="flex flex-row flex-wrap items-start justify-between gap-4"
		>
			<div class="space-y-1">
				<CardTitle>All contacts</CardTitle>
				<CardDescription>
					{contactsResponse.total} total contacts in this workspace.
				</CardDescription>
			</div>
			<span
				class="rounded-full bg-muted px-3 py-1 text-sm font-semibold text-foreground"
			>
				{contactsResponse.total}
			</span>
		</CardHeader>
		<CardContent>
			<ul class="space-y-3">
				{#each contactsResponse.data as contact, i}
					<li
						class="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-muted px-5 py-4"
					>
						<div class="space-y-1">
							<p class="text-base font-semibold">
								{contact.name}
							</p>
							<p class="text-sm text-muted-foreground">
								{contact.description}
							</p>
							<a
								class="text-sm font-medium text-primary hover:underline"
								href={`mailto:${contact.email}`}
								>{contact.email}</a
							>
						</div>
						<div class="flex flex-wrap gap-2">
							<Button
								variant="outline"
								size="sm"
								onclick={() => openGroupSheet(contact.id)}
							>
								Groups
							</Button>
							<Button
								variant="outline"
								size="sm"
								onclick={() => onEdit(i)}
							>
								Edit
							</Button>
							<Button
								variant="destructive"
								size="sm"
								onclick={() => onDelete(i)}
							>
								Delete
							</Button>
						</div>
					</li>
				{/each}
			</ul>
		</CardContent>
	</Card>
	<Sheet.Root
		bind:open={isGroupSheetOpen}
		onOpenChange={(open) => {
			if (!open) {
				isGroupSheetOpen = false;
				activeContactId = null;
			}
		}}
	>
		<Sheet.Content class="flex flex-col gap-6">
			<Sheet.Header>
				<Sheet.Title>Assign groups</Sheet.Title>
				<Sheet.Description>
					{#if activeContact}
						Update groups for {activeContact.name}.
					{:else}
						Select the groups that best match this contact.
					{/if}
				</Sheet.Description>
			</Sheet.Header>
			<div class="space-y-3">
				<p class="text-sm font-medium text-foreground">
					Available groups
				</p>
				{#if groupsResponse.data.length === 0}
					<p class="text-sm text-muted-foreground">
						Create a group first to start organizing contacts.
					</p>
				{:else}
					<ToggleGroup
						type="multiple"
						value={activeContactGroups}
						onValueChange={(value) => {
							if (activeContactId) {
								handleGroupSelection(activeContactId, value);
							}
						}}
					>
						{#each groupsResponse.data as group}
							<ToggleGroupItem value={`${group.id}`}>
								{group.name}
							</ToggleGroupItem>
						{/each}
					</ToggleGroup>
				{/if}
			</div>
			<Sheet.Footer>
				<Sheet.Close>
					<Button variant="outline">Close</Button>
				</Sheet.Close>
			</Sheet.Footer>
		</Sheet.Content>
	</Sheet.Root>
</main>
