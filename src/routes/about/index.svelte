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
      }`
      
      const query = filter + projection
      
      const author = await client
			.fetch(query)
			.catch((err) => this.error(500, err))
			
      return { author }
		}
</script>

<script lang="ts">
	import BlockContent from '@movingbrands/svelte-portable-text'
	import serializers from '../../components/serializers'

	import {fly, fade} from 'svelte/transition'

	export let author
	const { name, image, alt, caption, bio} = author
</script>

<style>
	img {
		filter: grayscale(100%);
	}
</style>

<svelte:head>
	<title>About</title>
</svelte:head>

<h1>About {name}</h1>

<img in:fade src={image} {alt}>

<div in:fly>
	<BlockContent blocks={bio} {serializers} />
</div>