<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types.d.ts';
	import { updateTicket } from '$lib/client/tickets.ts';

	export let data: PageData;

	onMount(() => {
		if (data.uuid) {
			updateTicket({
				uuid: data.uuid,
				hashes: data.tickets.map((t) => t.hash)
			});
		}
	});

	const localizeValidity = (validity: 'invalid' | 'valid' | 'used') => {
		if (validity === 'valid') return 'Platná vstupenka.';
		if (validity === 'used') return 'Použitá vstupenka';
		return 'Neplatná vstupenka!';
	};
</script>

<p>Děkujeme Vám za podporu! Vstupenky jsme zaslali i na Váš mail!</p>
{#each data.tickets as t}
	<div>
		<img alt={t.hash} src={t.qr} />
		<h3>{t.hash}</h3>
		<span>{localizeValidity(t.validity)}</span>
		<hr />
	</div>
{/each}
