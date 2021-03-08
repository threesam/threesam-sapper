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

</style>

<Nav {segment}/>

<main>
	<slot/>
</main>

<Footer />