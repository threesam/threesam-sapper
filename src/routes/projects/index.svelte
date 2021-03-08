<script context="module" lang="ts">
  import client from "../../sanityClient";

  export async function preload() {
    const query = /* groq */`*[_type == 'project']`
		
    const projects = await client
      .fetch(query)
			.catch((err) => this.error(500, err))
    
    return {projects}
  }
</script>

<script lang="ts">
  export let projects
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<h1>Projects</h1>

<ul>
	{#each projects as project}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel="prefetch" href="projects/{project.slug.current}">{project.title}</a></li>
	{/each}
</ul>
