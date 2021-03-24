<script lang="ts">
  import SvelteSeo from 'svelte-seo'
  import imageBuilder from '../utils/imageUrlBuilder'
  import { stores } from '@sapper/app';
	const { page } = stores();

  const SEO_IMAGE_WIDTH = 1200
  const SEO_IMAGE_HEIGHT = 1200
  const TWITTER_IMAGE_HEIGHT = 628

  export let title
  export let description
  export let publishedAt
  export let image
  export let alt
  export let tags
  export let type = 'website'

  console.log(
    title,
    description,
    image,
    alt,
    type,
    publishedAt,
    tags,
    $page.host,
    $page.path
  )
</script>

{#if type !== 'website'}

  <SvelteSeo 
    {title}
    {description}
    openGraph={{
      title,
      description,
      url: $page.host + $page.path,
      type: 'article',
      article: {
      publishedTime: publishedAt,
      authors: [
        "https://www.threesam.com/about"
      ],
      tags,
    },
      images: [
        {
          url: imageBuilder(image).width(SEO_IMAGE_WIDTH).height(SEO_IMAGE_HEIGHT),
          width: SEO_IMAGE_WIDTH,
          height: SEO_IMAGE_HEIGHT,
          alt
        }
      ]
    }} 
    twitter={{
      title,
      description,
      image: imageBuilder(image).width(SEO_IMAGE_WIDTH).height(TWITTER_IMAGE_HEIGHT),
      imageAlt: alt,
    }}
  />

{:else}

  <SvelteSeo 
  {title}
  {description}
  openGraph={{
    title,
    description,
    url: $page.host + $page.path,
    type: 'website',
    images: [
      {
        url: imageBuilder(image).width(SEO_IMAGE_WIDTH).height(SEO_IMAGE_HEIGHT),
        width: SEO_IMAGE_WIDTH,
        height: SEO_IMAGE_HEIGHT,
        alt
      }
    ]
  }} 
    twitter={{
      title,
      description,
      image: imageBuilder(image).width(SEO_IMAGE_WIDTH).height(TWITTER_IMAGE_HEIGHT),
      imageAlt: alt,
    }}
  />

{/if}