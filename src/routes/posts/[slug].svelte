<script context="module" lang="ts">
  import client from "../../sanityClient";
  import {format, parseISO} from 'date-fns'

  export async function preload({params}) {
    const {slug} = params
    const filter = /* groq */`*[_type == "post" && slug.current == $slug][0]`
    const projection = /* groq */`{
      title,
      "image": mainImage.asset->url,
      "alt": mainImage.alt,
      ...
    }`

    const query = filter + projection
		
    const post = await client
      .fetch(query, {slug})
			.catch((err) => this.error(500, err))
    
    return {post}
  }
</script>

<script lang="ts">
  export let post

  import Article from '../../components/Article.svelte'
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

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<Article data={post}>
  <div slot="hero">
    <span>{format(parseISO(post.publishedAt), 'mm/dd/yyyy')}</span>
  </div>
</Article>