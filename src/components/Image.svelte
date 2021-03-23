<script>
  import imageBuilder from '../utils/imageUrlBuilder'
  export let url;
  export let alt;

  let image
  let w = image.offsetWidth
  let h = image.offsetHeight
</script>

<style>
  img {
    filter: brightness(90%);
  }
</style>

<img bind:this={image} src={imageBuilder(url).width(w).height(h)} {alt} loading="lazy"/>
