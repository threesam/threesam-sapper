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

  import BlockContent from '@movingbrands/svelte-portable-text'
  import serializers from '../../components/serializers'
</script>

<svelte:head>
	<title>Projects</title>
</svelte:head>

<h1>{project.title}</h1>

<div>
  <p>{project.description} <br> <a href={project.href}>visit site</a></p>
  <img src={project.image} alt={project.alt} />
</div>

<article>
  <BlockContent blocks={project.caseStudy} {serializers} />
</article>