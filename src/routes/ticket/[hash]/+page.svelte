<script lang="ts">
	import { onMount } from "svelte";
	import type { PageData } from "./$types.d.ts";
	import { updateTicket } from "$lib/client/tickets.ts";

  export let data: PageData;

  onMount(() => {
    if (data.uuid) {
    updateTicket({
      uuid: data.uuid,
      hashes: data.tickets.map(t => t.hash)
    })
  }
  })
</script>

{#each data.tickets as t}
  <div>
    <img src={t.qr} />
    <h3>{t.hash}</h3>
    <span>{t.validity}</span>
    <hr />
  </div>
{/each}
