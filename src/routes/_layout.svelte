<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';

	export let segment;
</script>

<style>
	main {
		min-height: 100vh;
		position: relative;
	}
	
	.layout {
		padding: calc(3rem + var(--headerHeight)) var(--containerPadding);
		max-width: 40rem;
		margin: 0 auto;
	}
</style>

<Nav {segment}/>


<main class:layout={segment}>
	<slot></slot>
</main>

<Footer />