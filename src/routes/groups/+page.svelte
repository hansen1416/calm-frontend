<script lang="ts">
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
	import { Input } from "$lib/components/ui/input";
	import { Label } from "$lib/components/ui/label";

	const startingGroups = [
		{ name: "Friends" },
		{ name: "Family" },
		{ name: "Vendors" },
	];

	let groups = [...startingGroups];
	let isSaving = false;
	let formData = {
		name: "",
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		if (!formData.name.trim()) {
			return;
		}

		isSaving = true;

		try {
			groups = [...groups, { name: formData.name.trim() }];
			formData = { name: "" };
		} finally {
			isSaving = false;
		}
	};

	const handleReset = () => {
		formData = { name: "" };
	};

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
			<h1 class="text-3xl font-semibold tracking-tight">
				Contact groups
			</h1>
			<p class="text-sm text-muted-foreground">
				Organize contacts into groups for quick outreach.
			</p>
		</div>
		<Collapsible class="w-full max-w-sm">
			<CollapsibleTrigger
				class={buttonVariants({
					class: "w-full sm:w-auto",
				})}
			>
				+ Add group
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
								<Label for="group-name">Group name</Label>
								<Input
									id="group-name"
									name="group-name"
									type="text"
									placeholder="Enter group name"
									bind:value={formData.name}
								/>
							</div>
							<div class="flex flex-wrap gap-2">
								<Button type="submit" disabled={isSaving}>
									{isSaving ? "Saving..." : "Save group"}
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
				<CardTitle>All groups</CardTitle>
				<CardDescription>
					{groups.length} total groups in this workspace.
				</CardDescription>
			</div>
			<span
				class="rounded-full bg-muted px-3 py-1 text-sm font-semibold text-foreground"
			>
				{groups.length}
			</span>
		</CardHeader>
		<CardContent>
			<ul class="space-y-3">
				{#each groups as group, i}
					<li
						class="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-muted px-5 py-4"
					>
						<div class="space-y-1">
							<p class="text-base font-semibold">{group.name}</p>
							<p class="text-sm text-muted-foreground">
								Keep contacts aligned by purpose.
							</p>
						</div>
						<div class="flex flex-wrap gap-2">
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
</main>
