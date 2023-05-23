<script lang="ts">
	import type { PageData } from "./$types.d.ts";

  export let data: PageData;
</script>

{#each data.transactions as t}
  <div>
    <p>TID: {t.transactionId}</p>
    <p>Účet: {t.counterAccount.account}</p>
    <p>Jméno: {t.counterAccount.name}</p>
    <p>$: {t.currency} {t.amount}</p>
    <p>VS: {t.variableSymbol}</p>
    <hr />
  </div>
{/each}

