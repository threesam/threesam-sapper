<script lang="ts">
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
	
	// reset primary color
	import {beforeUpdate} from 'svelte'
  import {initialPrimaryColor} from '../stores/initialPrimaryColor'
  beforeUpdate(() => {
    if($initialPrimaryColor === null) {
      $initialPrimaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary')
    }
    document.documentElement.style.cssText = `--primary: ${$initialPrimaryColor}`
  })
</script>

<style>
	main {
		min-height: 100vh;
		position: relative;
	}

</style>

<Nav />


<main>
	<slot/>
</main>

<Footer />