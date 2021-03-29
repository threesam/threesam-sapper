<script lang="ts">
  import {onMount} from 'svelte'
  import imageBuilder from '../utils/imageUrlBuilder'

  export let url
  export let alt

  let width

  function parentWidth(node) {
    width = node.parentElement.clientWidth;
  }

  // function convertRemToPixels(rem) {    
  //   return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  // }

  let loaded = false
  let thisImage

  onMount(() => {
    // overflow container
    // const rem = convertRemToPixels(6)
    // width = width + rem

    // mount when image loads
    thisImage.onload = () => {
      loaded = true
    }
  })
</script>

<style>
  img {
    filter: brightness(90%);
    position: relative;
    margin: 2rem 0;
    opacity: 0;
    transition: opacity 1200ms ease-out;
  }

  img.loaded {
    opacity: 1;
  }
</style>

<img 
  {width}
  height={width}
  use:parentWidth 
  class:loaded
  src={imageBuilder(url).width(width).height(width).auto('format').url()} 
  bind:this={thisImage}
  {alt} 
  loading="lazy" 
/>
