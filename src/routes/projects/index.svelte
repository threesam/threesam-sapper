<script context="module" lang="ts">
  import client from "../../sanityClient";

  export async function preload() {
		const siteSettings = /* groq */`*[_type == "siteSettings"][0]{"image": mainImage.asset->url, "alt": mainImage.alt}`
    const projectsQuery = /* groq */`*[_type == 'project']{
			"slug": slug.current,
			title,
			"palette": mainImage.asset->metadata.palette.darkMuted.background,
			"image": mainImage.asset->url,
			"alt": mainImage.alt,
			description
		}`

		const query = `{
			"settings": ${siteSettings},
			"projects": ${projectsQuery}
		}`
		
    const data = await client
      .fetch(query)
			.catch((err) => this.error(500, err))
    
    return {data}
  }
</script>

<script lang="ts">
	import Container from '../../components/Container.svelte'
	import ListCard from '../../components/ListCard.svelte'
	import SEO from '../../components/SEO.svelte'

  export let data
	const {projects, settings} = data
</script>

<SEO title="Projects" description="The various works of Sam including projects and songs" {...settings} />

<Container>
	<h1>Projects</h1>
	<ListCard data={projects} />
</Container>
		