<script lang="ts">
	import '@fontsource/cutive-mono';
	import { page } from '$app/stores';
	import Back from '$lib/Back.svelte';

	$: isRoot = $page.route.id === '/';
</script>

<main>
	{#if !isRoot}
		<span class="back"><Back /></span>
	{/if}
	<slot />
</main>

<style lang="scss">
	:global(html, body) {
		font-size: 19px;

		padding: 0;
		margin: 0;

		width: 100%;
		min-height: 100%;
		min-height: 100vh;
		min-height: 100dvh;

		display: flex;
		justify-content: center;
		align-items: center;

		background: center / cover no-repeat url('/arty-bg.jpeg');
	}

	:global(body, input, button, a) {
		font-family: 'Cutive Mono', monospace;
		font-weight: 400;
		color: hsl(0, 0%, 90%);
		text-decoration-color: hsl(0, 0%, 50%);
	}

	:global(input) {
		background: hsl(158, 50%, 8%);
		border: 1px solid hsl(0, 0%, 50%);
		border-radius: 3px;
		font-size: 19px;
	}

	:global(button) {
		background: hsl(158, 70%, 8%);
		border: 1px solid hsl(0, 0%, 50%);
		border-radius: 5px;
		padding: 5px;
		font-size: 19px;
	}

	main {
		position: relative;
		max-width: 550px;
		background: rgba(0, 0, 0, 0.6);
		padding: 50px;

		.back {
			position: absolute;
			left: 20px;
			top: 20px;
		}

		:global(h1:first-of-type) {
			margin-top: 0;
		}
	}
</style>
