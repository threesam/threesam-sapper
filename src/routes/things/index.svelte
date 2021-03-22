<script context="module" lang="ts">
  import client from "../../sanityClient";

  export async function preload() {
    const query = /* groq */`*[_type == 'project']{
			"slug": slug.current,
			title,
			"palette": mainImage.asset->metadata.palette.darkMuted.background,
			"image": mainImage.asset->url,
			"alt": mainImage.alt,
			description
		}`
		
    const projects = await client
      .fetch(query)
			.catch((err) => this.error(500, err))
    
    return {projects}
  }
</script>

<script lang="ts">
	import Container from '../../components/Container.svelte'
	import ListCard from '../../components/ListCard.svelte'

  export let projects
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<Container>
	<h1>Projects</h1>
	<ListCard data={projects} />
</Container>
		