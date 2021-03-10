<script>
import { svg_element } from "svelte/internal";


  export let links
</script>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }

  a {
    color: var(--grey);
    transition: all 0.3s;
    height: 40px;
    width: 40px;
    margin: 0 1rem;
  }

  a:hover {
    color: var(--primary);
    transform: scale(1.2);
  }
</style>

<div>
  {#each links as {href, title, svg}}
    <a {href} aria-label={title}>{@html svg.code}</a>
  {/each}
</div>