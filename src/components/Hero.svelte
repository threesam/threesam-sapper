<script>
  import {onMount} from 'svelte'
  import {scale} from 'svelte/transition'
	import {heroSrc} from '../stores/heroSrc.js'

  let show = false
  onMount(() => show = true)
</script>

<style>
	section {
		position: relative;
		height: 100vh;
		width: 100%;
		display: grid;
		place-content: center;
		text-align: center;
		background-color: rgba(0,0,0,0.69);
		overflow: hidden;
	}
	
	img {
		position: absolute;
		top: 0;
		left: 0;
		object-fit: cover;
		width: 100%;
		height: 100%;
		z-index: -10;
	}

	h1 {
		font-size: clamp(3rem, 5vw, 4rem);
		padding: 0 1rem;
		line-height: 1.1;
	}
</style>

<section>
	{#if show}
		<div>
			<h1 id={$heroSrc.title}>{$heroSrc.title}</h1>
		</div>
		<img in:scale={{duration:2000, start: 1.2, opacity: 0.2}} src={$heroSrc.image} alt={$heroSrc.alt}>
	{/if}
</section>