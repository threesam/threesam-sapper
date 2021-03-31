<script>
  export let id
  import p5 from './p5/p5.min'
  export let sketch

  import { onMount } from 'svelte'

  onMount(() => {
    let myp5 = new p5(sketch, id)
  })
</script>

<style>
  div {
    position: absolute;
    top: var(--headerHeight);
    bottom: 0;
    right: 0;
    left: 0;
    display: block;
    z-index: -10;
  }
</style>

<div {id} />
