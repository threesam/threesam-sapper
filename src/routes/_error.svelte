<script lang="ts">
	export let status: number;
	export let error: Error;

	const dev = process.env.NODE_ENV === 'development';
  import {onMount} from 'svelte'
	import { stores } from '@sapper/app';
	const { page } = stores();
	import sketch from '../components/sketch.js'
  let P5Sketch
  onMount(async () => {
      const mod = await import("../components/CanvasP5.svelte")
      P5Sketch = mod.default
  })
</script>

<style>
	main {
		display: grid;
    place-content: center;
		min-height: calc(100vh - var(--headerHeight));
		padding: var(--containerPadding);
	}
	section {
		max-width: 30rem;
		padding: 3rem;
		border: 0.125rem solid var(--textColor);
		position: relative;
	}
	section:before {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		background: linear-gradient(45deg, var(--background), var(--primary));
		top: 0;
		left: 0;
		opacity: 0.4;
		z-index: -10;
	}
	h1, p {
		margin: 0 auto;
	}

	h1 {
		font-size: 2.8em;
		font-weight: 700;
		margin: 0 0 0.5em 0;
	}

	p {
		margin: 1em auto;
		padding:1rem 0;
	}


	@media (min-width: 480px) {
		h1 {
			font-size: 4em;
		}
	}
</style>

<svelte:head>
	<title>{status}</title>
</svelte:head>
  
<main>
	<svelte:component this={P5Sketch} {sketch} id=" contact-sketch"/>
	<section>
		<h1>{status}</h1>
		
		{#if status === 404}
			<p>Path "{$page.path}" does not exist</p>
			<hr>
			<p>Maybe go back <a href="/">home</a> and you can find what you're looking for</p>
		{:else}
			<p>{error.message}</p>
		{/if}

		{#if dev && error.stack}
		<pre>{error.stack}</pre>
		{/if}
	</section>
</main>
