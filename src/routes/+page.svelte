<script lang="ts">
	import { getTickets } from '$lib/client/tickets.ts';
	const tickets = getTickets();
</script>

<div class=logo>
	<img src="/psyna-logo.svg" alt="Psyna" />
</div>
<div class="content">
	<h1>Psyna 2024<br> předprodej vstupenek</h1>

	<p>Aktuálně v prodeji druhá vlna 200 vstupenek za 850 korun českých</p>

	<p><a href="/purchase">Koupit vstupenku!</a></p>
	<!--<p>Předprodej byl ukončen, nové lístky seženete už jen na místě.</p>-->
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
</div>

<style lang="scss">
	.logo {
		display: flex;
		justify-content: center;

		margin-top: -20px;
		margin-bottom: 20px;

		img {
			height: 250px;
				fill: white;
		}
	}
	.content {
			text-align: center;
	}
</style>
