<script context="module">
  import client from '../sanityClient'
  export async function preload() {
    const siteSettings = /* groq */ `*[_type == "siteSettings"][0]{
          tagLine,
					description,
          title,
          "image": mainImage.asset->url,
          "alt": mainImage.alt,
          "caption": mainImage.caption,
					"palette": mainImage.asset->metadata.palette.lightMuted.background,
      }`
    
    const projects = /* groq */`*[_type == 'project']{
			"slug": slug.current,
			title,
      href,
      repo,
			"palette": mainImage.asset->metadata.palette.darkMuted.background,
			"image": mainImage.asset->url,
			"alt": mainImage.alt,
			description
		}`

    const query = `{
      "settings": ${siteSettings},
      "projects": ${projects},
    }`

    const data = await client
      .fetch(query)
      .catch((err) => this.error(500, err))

    return { data }
  }
</script>

<script lang="ts">
  export let data
  const {settings,projects} = data
  const { title, image, alt, tagLine, description } = settings

  // imports
  import { onMount } from 'svelte'
  import { slide, scale, fly } from 'svelte/transition'
  import imageBuilder from '../utils/imageUrlBuilder'
  import {darkMode} from '../utils/store'
  import { stores } from '@sapper/app';
	const { page } = stores();


  // components
  import SEO from '../components/SEO.svelte'
  import Container from '../components/Container.svelte'
	import ListCard from '../components/ListCard.svelte'


  let innerW
  let innerH

  // show hero image, and dynamically match primary color to image palette
  let show = false
  onMount(() => {
    show = true
    // document.documentElement.style.cssText = `--primary: ${siteSettings.palette}`
  })
</script>

<style>
  section {
    position: relative;
    height: calc(100vh - var(--headerHeight));
    width: 100%;
    display: grid;
    place-content: center;
    background-color: rgba(0, 0, 0, 0.69);
    overflow: hidden;
    padding: 0 var(--containerPadding);
    clip-path: polygon( 0 0, 100% 0, 100% calc(100% - 1rem - 25px), 0 100%);
  }
  div {
    margin: 0 auto;
    max-width: 20rem;
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
    z-index: -10;
  }

  h1 {
    font-size: var(--bigH);
    width: 100%;
  }
  h2 {
    font-size: var(--h1);
  }
  p {
    margin-bottom: 2rem;
  }
</style>

<SEO {...data.settings} />

<svelte:window bind:innerWidth={innerW} bind:innerHeight={innerH} />

<section>
  {#if show}
    <div in:fly={{ y: 50, duration: 1000 }} class="card">
      <h1 id={title}>{title}</h1>
      <p in:slide={{ duration: 1000 }}>{tagLine} Let's <a href="#contact">talk.</a></p>
    </div>
    {#if $darkMode}
    <img
      loading="lazy"
      in:scale={{ duration: 2000, start: 1.2, opacity: 0.2 }}
      src={imageBuilder(image).width(innerW).height(innerH).url()}
      {alt} />
    {:else}
    <img
      loading="lazy"
      in:scale={{ duration: 2000, start: 1.2, opacity: 0.2 }}
      src={imageBuilder(image).width(innerW).height(innerH).flipHorizontal().flipVertical().url()}
      {alt} />
    {/if}
  {/if}
</section>

<Container>
	<h2>Projects</h2>
	<ListCard data={projects} />
</Container>
