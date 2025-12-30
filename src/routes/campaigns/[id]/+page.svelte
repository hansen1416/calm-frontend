<script lang="ts">
	import { page } from "$app/state";
	import CampaignEditor from "$lib/workflow/CampaignEditor.svelte";

	const campaignId: string = $derived(page.params.id) as string;
</script>

<CampaignEditor {campaignId} />
