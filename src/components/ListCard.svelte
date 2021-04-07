<script>
  import imageBuilder from '../utils/imageUrlBuilder'
  import SplashFilter from './SplashFilter.svelte'
  import { stores } from '@sapper/app';
	const { page } = stores();
  export let data

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
  h2 {
    font-size: 2rem;
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
  {#each data as {slug, title, image: src, alt, palette, description, href}}
    <li><a
      style={`height: ${height}px;`}
      rel="prefetch" 
      href="{$page.path}/{slug}">
      <div class="content">
        <h2 class:center={$page.path === '/thoughts' ? 'center' : ''}>{title}</h2>
        {#if description}
        <p>{description}</p>
        {/if}
        {#if href}
        <a href={href}>visit site</a>
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
      <SplashFilter />
    </a></li>
  {/each}
</ul>