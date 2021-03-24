<script context="module">
	
	import client from '../sanityClient'
  export async function preload() {
		const filter = /* groq */`*[_type == "siteSettings"][0]`
		const projection = /* groq */`{
          ...,
          title,
          "image": mainImage.asset->url,
          "alt": mainImage.alt,
          "caption": mainImage.caption,
					"palette": mainImage.asset->metadata.palette.lightMuted.background,
					"links": author->links
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
	import {fade, scale} from 'svelte/transition'
	import SocialLinks from '../components/SocialLinks.svelte'
	import imageBuilder from '../utils/imageUrlBuilder'
	import SEO from '../components/SEO.svelte'

	export let siteSettings
	const {title, image, alt, links} = siteSettings


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

<SEO 
	{...siteSettings}
/>

<svelte:window bind:innerWidth={innerW} bind:innerHeight={innerH} />

<section>
	{#if show}
		<div class="card">
			<h1 id="{title}">{title}</h1>
			<SocialLinks {links}/>
		</div>
		<img loading="lazy" in:scale={{duration:2000, start: 1.2, opacity: 0.2}} src={imageBuilder(image).width(innerW).height(innerH)} {alt} />
	{/if}
	</section>
<!-- <svelte:component this={P5Sketch} {sketch} id="contact-sketch"/>	 -->

<!-- <Contact /> -->


