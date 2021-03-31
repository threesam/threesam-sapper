<script>
  import {onMount} from 'svelte'
  import {fade} from 'svelte/transition'
  import Contact from '../../components/Contact.svelte'

  // ssr p5 sketch
  import sketch from './sketch.js'
  let P5Sketch
  onMount(async () => {
      const mod = await import("../../components/CanvasP5.svelte")
      P5Sketch = mod.default
  })
</script>

<style>
  section {
    display: grid;
    place-content: center;
    height: 100vh;
    width: 100%;
    position: relative;
    overflow: hidden;
  }
</style>

<section in:fade={{delay: 300}}>
  <svelte:component this={P5Sketch} {sketch} id="contact-sketch"/>
  <Contact/>
</section>