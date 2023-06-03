<script lang="ts">
	import type { PageData } from './$types.d.ts';
	export let data: PageData;
</script>

{#if data.matches.length === 0}
	No new matches.
{:else}
	New matches: {data.matches.join(', ')}
{/if}
