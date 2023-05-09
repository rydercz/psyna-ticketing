<script lang="ts">
	import type { PageData } from "./$types.d.ts";

	export let data: PageData;
</script>

Yo!

<img src={data.qr} alt="" />
