<script lang="ts">
	import '@fontsource-variable/roboto-flex';
	import '@fontsource/roboto';
</script>

<slot />

<style lang="scss">
	:global(body) {
		font-family: 'Roboto Flex Variable', 'Roboto', sans-serif;
		--weight: 300;
		font-weight: var(--weight);
		font-variation-settings: 'wdth' 75, 'wght' var(--weight);
	}

  :global(h1, h2, h3, h4, h5, h6, b, strong) {
    --weight: 500;
		font-weight: var(--weight);
		font-variation-settings: 'wdth' 75, 'wght' var(--weight);
  }
</style>
