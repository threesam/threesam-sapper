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
	import Container from '../../components/Container.svelte'
  export let posts
</script>

<svelte:head>
	<title>Posts</title>
</svelte:head>

<Container>
	<h1>Recent Posts</h1>
	<ul>
		{#each posts as post}
			<li><a rel="prefetch" href="posts/{post.slug.current}">{post.title}</a></li>
		{/each}
	</ul>
</Container>
