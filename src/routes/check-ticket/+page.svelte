<script lang="ts">
	import { goto } from '$app/navigation';
	import { Scanner } from 'qr-svelte';
	let scanning = false;
	let manualHash = '';

	const onDetected = async (data: string) => {
		if (!scanning) return;
		const hash = data.match(/^https:\/\/artyparty.csha.io\/ticket\/([^\/]+)$/)?.[1];
		if (!hash) return;
		scanning = false;
		await goto(`/check-ticket/${hash}${window.location.search}`);
	};

	const checkManually = async (hash: string) => {
		scanning = false;
		await goto(`/check-ticket/${hash}${window.location.search}`);
	};
</script>

<Scanner
	{scanning}
	maxScansPerSecond={4}
	on:detected={({ detail: { data } }) => onDetected(data)}
/>
<p>
	<button on:click={() => (scanning = !scanning)}>
		{#if scanning}
			Zastavit skenování
		{:else}
			Skenovat
		{/if}
	</button>
</p>
<p>
	<input placeholder="Kód vstupenky" bind:value={manualHash} />
	<button on:click={() => checkManually(manualHash)}>Ověřit manuálně</button>
</p>

<style>
	:global(.qr > video) {
		width: 100%;
	}
</style>
