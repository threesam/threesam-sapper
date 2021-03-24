<script context="module" lang="ts">
	
	import client from '../../sanityClient'
  export async function preload() {
		const filter = /* groq */`*[_type == "author"][0]`
		const projection = /* groq */`{
          ...,
          name,
          "image": image.asset->url,
          "alt": image.alt,
          "caption": image.caption,
					"palette": image.asset->metadata.palette.vibrant.background
      }`
      
      const query = filter + projection
      
      const author = await client
			.fetch(query)
			.catch((err) => this.error(500, err))
			
      return { author }
		}
</script>

<script lang="ts">
	import Container from '../../components/Container.svelte'
	import SEO from '../../components/SEO.svelte'
	import Image from '../../components/Image.svelte'
	import BlockContent from '@movingbrands/svelte-portable-text'
	import serializers from '../../components/serializers'

	import {fly, fade} from 'svelte/transition'
	import {onMount} from 'svelte'

	export let author
	const { name, image, alt, caption, bio, palette} = author
  onMount(() => {
    document.documentElement.style.cssText = `--primary: ${palette}`
  })

	let width

	function parentWidth(node) {
    width = node.parentElement.clientWidth;
	}
</script>

<style>
	h1 {
		margin-bottom: 0;
	}
</style>

<SEO 
	title="About"
	description="Short bio of Sam"
	{image}
	{alt}
/>

<Container>

	<h1>About {name}</h1>
	
	<!-- render iamge with square aspect ratio -->
	<Image url={image} {alt} />
	
	<div in:fly>
		<BlockContent blocks={bio} {serializers} />
	</div>
</Container>