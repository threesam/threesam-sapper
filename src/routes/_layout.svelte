<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';

	export let segment;

	// reset primary color
	import {beforeUpdate} from 'svelte'
  import {initialColor} from '../stores/palette'
  beforeUpdate(() => {
    if($initialColor === null) {
      $initialColor = getComputedStyle(document.documentElement).getPropertyValue('--primary')
    }
    document.documentElement.style.cssText = `--primary: ${$initialColor}`
  })
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