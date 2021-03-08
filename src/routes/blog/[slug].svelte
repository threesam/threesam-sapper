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

  import BlockContent from '@movingbrands/svelte-portable-text'
  import serializers from '../../components/serializers'
</script>

<svelte:head>
	<title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>

<img src={post.image} alt={post.alt} />
<span>{format(parseISO(post.publishedAt), 'yyyy/mm/dd')}</span>
<BlockContent blocks={post.body} {serializers} />
