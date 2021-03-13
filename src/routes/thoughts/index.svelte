<script context="module" lang="ts">
  import client from "../../sanityClient";

  export async function preload() {
    const query = /* groq */`*[_type == 'post']{
			"slug": slug.current,
			title,
			"palette": mainImage.asset->metadata.palette.darkMuted.background,
			"image": mainImage.asset->url,
			"alt": mainImage.alt

		}`
		
    const posts = await client
      .fetch(query)
			.catch((err) => this.error(500, err))
    
    return {posts}
  }
</script>

<script lang="ts">
	import Container from '../../components/Container.svelte'
	import ListCard from '../../components/ListCard.svelte'
  export let posts
</script>

<style>
  ul {
		margin: 0;
		list-style: none;
		padding: 0;
	}
  a {
    display: grid;
    place-content: center;
    position: relative;
    width: 100%;
    height: 400px;
    padding: 2rem;
		border-radius: 13px;
    overflow: hidden;
    margin-bottom: 2rem;
  }
  h2 {
    font-size: 2rem;
    text-shadow: 0 0 3px black;
  }
  img {
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    z-index: -10;
    object-fit: cover;
    filter: brightness(40%);
  }
</style>

<svelte:head>
	<title>Posts</title>
</svelte:head>

<Container>
	<h1>Recent Posts</h1>
	<ListCard data={posts} />
</Container>
