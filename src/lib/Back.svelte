<script lang="ts">
	import _Fa from 'svelte-fa';
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
	import { browser } from '$app/environment';
	const Fa = _Fa as any;

	const isOnTicketCheckPage = browser && window.location.pathname.startsWith('/check-ticket');
	const href = isOnTicketCheckPage ? `/check-ticket${window.location.search}` : '/';
</script>

<a {href} aria-label="Zpět na hlavní stránku">
	<Fa icon={faArrowLeft} />
</a>
