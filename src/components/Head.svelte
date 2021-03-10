<script>
  let BASE_URL = "https://threesam.com"
  export let title = 'threeSam'
  export let excerpt = "An over-engineered portfolio of music, art, thoughts and tech."
  export let image = "https://cdn.sanity.io/images/qcht0vh1/production/e102e93c707035f79366e389d80437596a150aa8-3000x1987.jpg?w=640&h=442&fit=max"
  export let alt = "a foggy mountain range"
  export let slug = ""
</script>

<svelte:head>
  <slot />
  <meta property="og:title" content={title}>
  <meta property="og:description" content={excerpt}>
  <meta name="description" content={excerpt}>
  <meta property="og:image" content={image}>
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:secure_url" content={image}>
  <meta property="og:image:width" content="640">
  <meta property="og:image:height" content="442">
  <meta property="og:url" content={`${BASE_URL}/${slug}`}>
  <meta name="twitter:card" content="summary_large_image">
  <meta property="og:site_name" content="threeSam">
  <meta name="twitter:image:alt" content={alt}>
</svelte:head>