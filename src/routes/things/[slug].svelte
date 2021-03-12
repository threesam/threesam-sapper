<script context="module" lang="ts">
  import client from "../../sanityClient";

  export async function preload({params}) {
    const {slug} = params
    const filter = `*[_type == "project" && slug.current == $slug][0]`
    const projection = `{
      title,
      "image": mainImage.asset->url,
      "alt": mainImage.alt,
      "palette": mainImage.asset->metadata.palette.vibrant.background,
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
  console.log(project)
  import Article from '../../components/Article.svelte'

  // match primary color to media palette
  import {onMount} from 'svelte'
import { time_ranges_to_array } from 'svelte/internal'
  onMount(() => {
    document.documentElement.style.cssText = `--primary: ${project.palette}`
  })
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
  <div slot="after-blocks">
    <h3>Tech</h3>
    {#each project.tags as {value}, index}
      <!-- print tag plus separator, except last element -->
      <span> <em>{value} {index !== project.tags.length - 1 ? '-' : ''}</em> </span>
    {/each}
  </div>
</Article>
