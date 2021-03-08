<script context="module" lang="ts">
  import client from "../../sanityClient";

  export async function preload() {
    const query = /* groq */`*[_type == 'song']`
		
    const songs = await client
      .fetch(query)
			.catch((err) => this.error(500, err))
    
    return {songs}
  }
</script>

<script lang="ts">
  export let songs
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Sounds</h1>

<ul>
	{#each songs as {slug, title}}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel="prefetch" href="sounds/{slug.current}">{title}</a></li>
	{/each}
</ul>
