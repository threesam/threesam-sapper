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
	console.log(projects)
	import Container from '../../components/Container.svelte'
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<Container>
	<h1>Projects</h1>
	<ul>
		{#each projects as {slug, title}}
			<li>
				<a rel="prefetch" href="things/{slug.current}">{title}</a>
			</li>
		{/each}
	</ul>
</Container>
		