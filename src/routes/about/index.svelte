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
	import BlockContent from '@movingbrands/svelte-portable-text'
	import serializers from '../../components/serializers'
	import imageBuilder from '../../utils/imageUrlBuilder.js'

	import {fly, fade} from 'svelte/transition'
	import {onMount} from 'svelte'

	export let author
	const { name, image, alt, caption, bio, palette} = author
  onMount(() => {
    document.documentElement.style.cssText = `--primary: ${palette}`
  })

	let width

	function parentWidth(elem) {
    width = elem.parentElement.clientWidth;
	}
</script>

<SEO 
	title="About"
	description="Short bio of Sam"
	{image}
	{alt}
/>

<Container>

	<h1>About {name}</h1>
	
	<!-- render iamge with square aspect ratio -->
	<img use:parentWidth in:fade {width} height={width} src={imageBuilder(image).width(width).height(width).url()} {alt}>
	
	<div in:fly>
		<BlockContent blocks={bio} {serializers} />
	</div>
</Container>