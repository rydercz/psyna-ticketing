<script lang="ts">
	export let data;
</script>

{#if data.validity === 'valid'}
	<h2>Platná vstupenka!</h2>
{:else if data.validity === 'used'}
	<h2 class="ticket-invalid">Již použitá vstupenka!</h2>
{:else}
	<h2 class="ticket-invalid">Neplatná nebo neexistující vstupenka!</h2>
{/if}

{#if data.mail}
	<p>Jméno: {data.name}</p>
	<p>E-mail: {data.mail}</p>
{/if}
{#if data.validity === 'used'}
	<p>Použitá před {((Date.now() - data.used) / 60_000).toFixed(0)} minutami</p>
{/if}

<style>
  :global(body:has(h2.ticket-invalid)) {
    filter: hue-rotate(180deg);
  }
</style>
