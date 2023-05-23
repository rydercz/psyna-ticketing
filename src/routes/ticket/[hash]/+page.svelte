<script lang="ts">
	import type { PageData } from "./$types.d.ts";

  export let data: PageData;
</script>

{#each data.tickets as t}
  <div>
    <img src={t.qr} />
    <h3>{t.hash}</h3>
    <span>{t.validity}</span>
    <hr />
  </div>
{/each}
