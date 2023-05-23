<script lang="ts">
	import { getTickets } from '$lib/client/tickets.ts';
	const tickets = getTickets();
</script>

<h1>Předprodej vstupenek</h1>
<p><a href="/purchase">Koupit vstupenku!</a></p>
{#if tickets.length === 0}
	<p>Na tomto zařízení nemáte uložené žádné vstupenky.</p>
{:else}
	{#each tickets as t}
		{#if t.hashes?.length}
			{#each t.hashes as hash}
				<p><a href="/ticket/{hash}?uuid={t.uuid}">Vstupenka {hash}</a></p>
			{/each}
		{:else}
			<p>
				<a href="/purchase/2?vs={t.vs}&uuid={t.uuid}">Vstupenka pro {t.email} čeká na zaplacení</a>
			</p>
		{/if}
	{/each}
{/if}
