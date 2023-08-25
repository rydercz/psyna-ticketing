<script lang="ts">
	import { goto } from '$app/navigation';
	import { Scanner } from 'qr-svelte';
	let scanning = false;

	const onDetected = async (data: string) => {
		if (!scanning) return;
		const hash = data.match(/^https:\/\/artyparty.csha.io\/ticket\/([^\/]+)$/)?.[1];
		if (!hash) return;
		scanning = false;
		await goto(`/check-ticket/${hash}${window.location.search}`);
	};
</script>

<Scanner {scanning} on:detected={({ detail: { data } }) => onDetected(data)} />
<button on:click={() => (scanning = !scanning)}>
  {#if scanning}
    Zastavit skenování
  {:else}
    Skenovat
  {/if}
</button>

<style>
	:global(.qr > video) {
		width: 100%;
	}
</style>
