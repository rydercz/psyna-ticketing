<script lang="ts">
	// import { getTickets } from '$lib/client/tickets.ts';
	// const tickets = getTickets();
</script>

<div class=logo>
	<img src="/psyna-logo.svg" alt="Psyna" />
</div>
<!--<div class="content">-->
<!--	<h1>Psyna 2024<br> předprodej vstupenek</h1>-->

<!--&lt;!&ndash;	<p>Aktuálně v prodeji poslední vlna vstupenek<br> za 1000 korun českých.</p>&ndash;&gt;-->
<!--&lt;!&ndash;	<p>Předprodej končí 5.7.2024.<br>Vstup na místě bude za 1250 korun českých.</p>&ndash;&gt;-->

<!--&lt;!&ndash;	<p><a href="/purchase">Koupit vstupenku!</a></p>&ndash;&gt;-->

<!--	<hr>-->

<!--	<p>Předprodej byl ukončen.</p>-->
<!--	<p>Vstupenek bude dost na místě.</p>-->

<!--	<hr>-->

<!--	V případě problémů s platbou nás kontaktujte na <a href="mailto:vstupenky@psyna.cz">vstupenky@psyna.cz</a>-->

<!--	<hr>-->

<!--	{#if tickets.length === 0}-->
<!--		<p>Na tomto zařízení nemáte uložené žádné vstupenky.</p>-->
<!--	{:else}-->
<!--		{#each tickets as t}-->
<!--			{#if t.hashes?.length}-->
<!--				{#each t.hashes as hash}-->
<!--					<p><a href="/ticket/{hash}?uuid={t.uuid}">Vstupenka {hash}</a></p>-->
<!--				{/each}-->
<!--			{:else}-->
<!--				<p>-->
<!--					<a href="/purchase/2?vs={t.vs}&uuid={t.uuid}">Vstupenka pro {t.email} čeká na zaplacení</a>-->
<!--				</p>-->
<!--			{/if}-->
<!--		{/each}-->
<!--	{/if}-->
<!--</div>-->

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
