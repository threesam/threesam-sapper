<script context="module" lang="ts">
  import client from "../../sanityClient";

  export async function preload({params}) {
    const {slug} = params
    const filter = `*[_type == "project" && slug.current == $slug][0]`
    const projection = `{
      title,
      "image": mainImage.asset->url,
      "alt": mainImage.alt,
      ...
    }`

    const query = filter + projection
		
    const project = await client
      .fetch(query, {slug})
			.catch((err) => this.error(500, err))
    
    return {project}
  }
</script>

<script lang="ts">
  export let project

  import Article from '../../components/Article.svelte'
</script>

<style>
  p {
    max-width: 30rem;
    margin: 0 auto;
  }
</style>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<Article data={project}>
  <div slot="hero">
    <p>{project.description}</p>
    <br>
    <a class="link" href={project.href}>visit site</a>
  </div>
  <h3 slot="before-blocks">Case Study</h3>
</Article>
