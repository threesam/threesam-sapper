<script context="module" lang="ts">
	
	import client from '../../sanityClient'
  export async function preload() {
		const filter = /* groq */`*[_type == "siteSettings"][0]`
		const projection = /* groq */`{
				"resume": resume.asset->{
					url,
					"date": _updatedAt
				},
				"bio": author->bio,
				"name": author->name
      }`
      
      const query = filter + projection
      
      const author = await client
			.fetch(query)
			.catch((err) => this.error(500, err))
			
      return { author }
		}
</script>

<script lang="ts">
  import Resume from '../../components/Resume.svelte';
	import Container from '../../components/Container.svelte'
	import SEO from '../../components/SEO.svelte'
	import BlockContent from '@movingbrands/svelte-portable-text'
	import serializers from '../../components/serializers'
	import {blur, fly} from 'svelte/transition'

	export let author
	const { name, image, alt, bio, resume} = author
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
	<h1 in:blur={{duration: 1000}}>About {name}</h1>
	<div in:fly={{duration: 1000, x: 69}}>
		<BlockContent blocks={bio} {serializers} />
	</div>
	<Resume {resume} />
	
</Container>