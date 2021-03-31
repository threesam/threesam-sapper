<script context="module">
	
	import client from '../sanityClient'
  export async function preload() {
		const filter = /* groq */`*[_type == "siteSettings"][0]`
		const projection = /* groq */`{
          tagLine,
					description,
          title,
          "image": mainImage.asset->url,
          "alt": mainImage.alt,
          "caption": mainImage.caption,
					"palette": mainImage.asset->metadata.palette.lightMuted.background,
      }`
      
      const query = filter + projection
      
      const siteSettings = await client
			.fetch(query)
			.catch((err) => this.error(500, err))
			
      return { siteSettings }
		}
</script>

<script lang="ts">
	import {onMount} from 'svelte'
	import {slide, scale, fly} from 'svelte/transition'
	import imageBuilder from '../utils/imageUrlBuilder'
	import SEO from '../components/SEO.svelte'
	import Footer from '../components/Footer.svelte'
	
	export let siteSettings
	const {title, image, alt, tagLine, description} = siteSettings


	let innerW
	let innerH

	
	// show hero image, and dynamically match primary color to image palette
	let show = false
	onMount(()=> {
		show = true
		document.documentElement.style.cssText = `--primary: ${siteSettings.palette}`
	})
</script>

<style>
	section {
		position: relative;
		height: 100vh;
		width: 100%;
		display: grid;
		place-content: center;
		background-color: rgba(0,0,0,0.69);
		overflow: hidden;
	}
	div {
		width: min-content;
		margin: 0 auto;
		/* text-align: center; */
		padding: clamp(2rem, 5vw, 3rem);
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
		font-size: clamp(3rem, 6vw, 9rem);
	}

	p {
		font-size: clamp(1rem, 2vw, 1.7rem);
		font-weight: 100;
	}
</style>

<SEO 
	{...siteSettings}
/>

<svelte:window bind:innerWidth={innerW} bind:innerHeight={innerH} />

<section>
	{#if show}
		<div in:fly={{y: 50, duration: 1000}} class="card">
			<h1 id={title}>{title}</h1>
			<p in:slide={{duration: 1000}}>{tagLine}</p>
		</div>
		<img 
			loading="lazy" 
			in:scale={{duration:2000, start: 1.2, opacity: 0.2}} 
			src={imageBuilder(image).width(innerW).height(innerH).url()} 
			{alt} 
		/>
	{/if}
	</section>
<!-- <svelte:component this={P5Sketch} {sketch} id="contact-sketch"/>	 -->

<Footer />


