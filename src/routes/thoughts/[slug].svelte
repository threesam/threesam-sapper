<script context="module" lang="ts">
  import client from "../../sanityClient";

  export async function preload({params}) {
    const {slug} = params
    const thoughts = /* groq */`*[_type == "post" && slug.current == $slug][0]{
      title,
      "image": mainImage.asset->url,
      "alt": mainImage.alt,
      "palette": mainImage.asset->metadata.palette.vibrant.background,
      "tags": tags[].value,
      publishedAt
    }`

    const query = thoughts
		
    const post = await client
      .fetch(query, {slug})
			.catch((err) => this.error(500, err))
    
    return {post}
  }
</script>

<script lang="ts">
  import {format, parseISO} from 'date-fns'
  import Article from '../../components/Article.svelte'
  import SEO from '../../components/SEO.svelte'
  
  export let post
  console.log(post)
  
  // match primary color to media palette
  import {onMount} from 'svelte'
  onMount(() => {
    document.documentElement.style.cssText = `--primary: ${post.palette}`
  })
</script>

<style>
  span {
    display: inline-block;
    border: 1px solid var(--darkGrey);
    border-radius: 13px;
    padding: 1rem;
    margin-bottom: 2rem;
  }
</style>

<SEO type="article" {...post} />

<Article data={post}>
  <div slot="hero">
    <span>{format(parseISO(post.publishedAt), 'yyyy-MM-dd')}</span>
  </div>
</Article>