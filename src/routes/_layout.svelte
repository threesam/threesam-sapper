<script lang="ts">
	import Nav from '../components/Nav.svelte'
	import Theme from '../components/Theme.svelte'
	import Footer from '../components/Footer.svelte'

	// reset primary color
	import { beforeUpdate } from 'svelte'
	import { initialPrimaryColor } from '../stores/initialPrimaryColor'
	beforeUpdate(() => {
		if ($initialPrimaryColor === null) {
			$initialPrimaryColor =
				getComputedStyle(
					document.documentElement
				).getPropertyValue('--primary')
		}
		document.documentElement.style.cssText = `--primary: ${$initialPrimaryColor}`
	})
</script>

<Nav />

<main>
	<slot />
</main>

<Footer />

<div>
	<Theme />
</div>

<style>
	main {
		min-height: 100vh;
		position: relative;
	}

	div {
		position: fixed;
		z-index: 10;
		padding: 0.5rem;
		padding-bottom: 0;
		bottom: var(--containerPadding);
		right: var(--containerPadding);
		opacity: 0.8;
	}
</style>
