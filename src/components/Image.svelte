<script lang="ts">
  import {onMount} from 'svelte'
  import imageBuilder from '../utils/imageUrlBuilder'

  export let url
  export let alt

  let width

  function parentWidth(node) {
    width = node.parentElement.clientWidth;
    console.log(width)
  }

  function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  onMount(() => {
    const rem = convertRemToPixels(6)
    width = width + rem
  })
</script>

<style>
  img {
    filter: brightness(90%);
    position: relative;
    margin: 2rem 0;
    left: -3rem;
    width: calc(100% + 6rem);
    height: calc(100% + 6rem);
  }
</style>

<img 
  {width}
  height={width}
  use:parentWidth 
  src={imageBuilder(url).width(width).height(width).auto('format').url()} 
  {alt} 
  loading="lazy" 
/>
