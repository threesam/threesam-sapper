<script context="module" lang="ts">
  import client from "../../sanityClient";

  export async function preload() {
    const query = /* groq */`*[_type == 'post']`
		
    const posts = await client
      .fetch(query)
			.catch((err) => this.error(500, err))
    
    return {posts}
  }
</script>

<script lang="ts">
  export let posts
</script>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Recent Posts</h1>

<ul>
	{#each posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel="prefetch" href="blog/{post.slug.current}">{post.title}</a></li>
	{/each}
</ul>
