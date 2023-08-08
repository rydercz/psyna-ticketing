<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import type { PageData } from './$types.js';
	import { updateTicket } from '$lib/client/tickets.ts';

	export let data: PageData;

	const { form, constraints, errors, enhance } = superForm(data.form, {
		validators: {
			zip: (s: string) =>
				s.replaceAll(/\s/g, '').match(/^\d{5}$/) ? null : 'PSČ musí být pět číslic'
		}
	});

	$: $form.uuid = data.uuid;

	const onSubmit = () => {
		updateTicket({
			uuid: $form.uuid,
			name: $form.name,
			email: $form.email
		});
	};
</script>

<!-- <SuperDebug data={$form} /> -->

<h1>Arty Party no. IV 2023 - předprodej vstupenek</h1>
<form method="post" use:enhance on:submit={onSubmit}>
	<input type="hidden" name="uuid" value={data.uuid} />
	<label>
		Jméno a příjmení
		<input name="name" bind:value={$form.name} {...$constraints.name} />
		<small>{$errors.name ?? ''}</small>
	</label>
	<label>
		E-mail
		<input name="email" type="email" bind:value={$form.email} {...$constraints.email} />
		<small>{$errors.email ?? ''}</small>
	</label>
	<label>
		Ulice a číslo popisné
		<input name="street" bind:value={$form.street} {...$constraints.street} />
		<small>{$errors.street ?? ''}</small>
	</label>
	<label>
		Město
		<input name="city" bind:value={$form.city} {...$constraints.city} />
		<small>{$errors.city ?? ''}</small>
	</label>
	<label>
		PSČ
		<input name="zip" bind:value={$form.zip} />
		<small>{$errors.zip ?? ''}</small>
	</label>
	<label>
		Počet lístků
		<input
			name="ticketCount"
			type="number"
			bind:value={$form.ticketCount}
			{...$constraints.ticketCount}
		/>
		<small>{$errors.ticketCount ?? ''}</small>
	</label>
	<span>
		{$form.ticketCount * data.ticketPrice},– Kč
		<button>Koupit!</button>
	</span>
</form>

<p>
	Po připsání platby na náš účet Vám na zadaný email Vám přijde elektronická vstupenka s QR kódem.
	Při vstupu na akci jej zkontrolujeme. Veškerá vyplněná osobní data budeme shromažďovat pouze pro
	účely ověření validity vstupenek a po akci budou smazána.
</p>

<p>
	Odesláním souhlasíte s
	<a
		href="https://docs.google.com/document/d/1596Li0ZR5RlexEbuMNEqPA1z0nn6hZoEqC1L753MjWA/edit?usp=sharing"
		target="_blank"
		>obchodními podmínkami</a
	>.
</p>

<style lang="scss">
	label,
	span {
		display: block;
		padding: 0.1em;

		input {
			display: block;
		}
	}

	span {
		padding-top: 0.5em;
	}
</style>
