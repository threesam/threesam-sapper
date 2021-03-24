<script context="module" lang="ts">
  import client from "../../sanityClient";

  export async function preload() {
    const siteSettings = /* groq */`*[_type == "siteSettings"][0]{"image": mainImage.asset->url, "alt": mainImage.alt}`
    const postsQuery = /* groq */`*[_type == 'post']{
			"slug": slug.current,
			title,
			"palette": mainImage.asset->metadata.palette.darkMuted.background,
			"image": mainImage.asset->url,
			"alt": mainImage.alt

		}`

    const query = `{
			"settings": ${siteSettings},
			"posts": ${postsQuery}
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
  const { posts, settings} = data
</script>

<SEO 
  title="Posts" 
  description="Various thoughts on topics including tech, music, and community" 
  {...settings} 
/>

<Container>
	<h1>Recent Posts</h1>
	<ListCard data={posts} />
</Container>
