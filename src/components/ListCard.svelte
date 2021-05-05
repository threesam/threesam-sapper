<script>
  export let data
  import imageBuilder from '../utils/imageUrlBuilder'

  import SplashFilter from './SplashFilter.svelte'
  import CardLinks from './CardLinks.svelte';

  let width
  let height = 350

  function parentWidth(node) {
    width = node.parentElement.clientWidth;
  }
</script>

<style>
  ul {
		margin: 0;
		list-style: none;
		padding: 0;
	}
  a {
    display: grid;
    place-content: center;
    position: relative;
    width: 100%;
		border-radius: 13px;
    overflow: hidden;
    margin-bottom: 2rem;
    box-shadow: var(--level-2);
    transition: all 0.3s ease-in-out;
    border: 0.125rem solid var(--darkGrey);
  }
  a:hover {
    box-shadow: var(--level-3);
  }
  h3 {
    font-size: var(--h3);
    margin: 0;
  }
  img {
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    z-index: -20;
    object-fit: cover;
  }
  
  .content {
    padding: 2rem;
    width: 100%;
  }
  .center {
    text-align: center;
  }
</style>

<ul>
  {#each data as {slug, title, image: src, alt, palette, description, href, repo}}
    <li class="umami--click--project-{slug}"><a
      style="height: {height}px; border: 0.125rem solid {palette}"
      rel="prefetch" 
      href="projects/{slug}">
      <div class="content">
        <h3>{title}</h3>
        {#if description}
        <p>{description}</p>
        {/if}
      </div>
      <img 
        {width} 
        {height} 
        use:parentWidth 
        src={imageBuilder(src).width(width).height(height).auto('format').url()} 
        {alt} 
        loading="lazy" 
      />
      <CardLinks {href} {repo} {palette} />
      <SplashFilter />
    </a></li>
  {/each}
</ul>