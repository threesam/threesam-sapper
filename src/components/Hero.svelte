<script>
  import {onMount} from 'svelte'
  import {scale} from 'svelte/transition'
	import SplashFilter from './SplashFilter.svelte'

	export let data
	const {image: src, alt, title} = data

  let show = false
  onMount(() => show = true)
</script>

<style>
	section {
		position: relative;
		height: calc(100vh - var(--headerHeight));
		width: 100%;
		display: grid;
		place-content: center;
		text-align: center;
		overflow: hidden;
		padding: var(--containerPadding);
		box-shadow: var(--level-1);
		clip-path: polygon( 0 0, 100% 0, 100% calc(100% - 1rem - 25px), 0 100%);
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
		font-size: clamp(var(--h1), 5vw, var(--bigH));
		padding: 0 1rem;
		line-height: 1.1;
	}
</style>

<section>
	{#if show}
		<div>
			<h1 id={title}>{title}</h1>
			<slot/>
		</div>
		<img in:scale={{duration:2000, start: 1.2, opacity: 0.2}} {src} {alt}>
		<SplashFilter />
	{/if}
</section>