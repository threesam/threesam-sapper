<script context="module" lang="ts">
  import client from "../../sanityClient";

  export async function preload({params}) {
    const {slug} = params
    const query = /* groq */`*[_type == "project" && slug.current == $slug][0]{
      title,
      "image": mainImage.asset->url,
      "alt": mainImage.alt,
      "palette": mainImage.asset->metadata.palette.darkMuted.background,
      ...
    }`

    const project = await client
      .fetch(query, {slug})
			.catch((err) => this.error(500, err))
    
    return {project}
  }
</script>

<script lang="ts">
  import Article from '../../components/Article.svelte'
  import SEO from '../../components/SEO.svelte'
  
  export let project
  const {title, image, alt, palette, description, href, repo, tags} = project

  // match primary color to media palette
  import {onMount} from 'svelte'
import CardLinks from '../../components/CardLinks.svelte'
  onMount(() => {
    document.documentElement.style.cssText = `--primary: ${palette}`
  })
</script>

<style>
  p {
    max-width: 30rem;
    margin: 0 auto;
  }
</style>

<SEO {...project} />

<Article data={project}>
  <div slot="hero">
    <p>
      {description}
      <!-- <br>
      <br>
      {#if href}
      <a {href}>visit site</a>
      {/if} -->
    </p>
  </div>
  <h3 slot="before-blocks">Case Study</h3>
  <div slot="after-blocks">
    <h4>Tech</h4>
    {#each tags as {value}, index}
    <!-- print tag plus separator, except last element -->
    <span> <em>{value} {index !== tags.length - 1 ? '-' : ''}</em> </span>
    {/each}
    <CardLinks relative {href} {repo} />
  </div>
</Article>
