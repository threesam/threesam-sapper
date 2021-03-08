<script context="module" lang="ts">
  import client from "../../sanityClient";

  export async function preload({params}) {
    const {slug} = params
    const filter = `*[_type == "song" && slug.current == $slug][0]`
    const projection = `{
      title,
      "image": mainImage.asset->url,
      "alt": mainImage.alt,
      "audio": audio.asset->url,
      lyrics,
      ...
    }`

    const query = filter + projection
		
    const song = await client
      .fetch(query, {slug})
			.catch((err) => this.error(500, err))
    
    return {song}
  }
</script>

<script lang="ts">
  export let song
</script>

<style>
  audio {
    width: 100%;
  }
</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>{song.title}</h1>

<audio controls src={song.audio} />

<img src={song.image} alt={song.alt} />