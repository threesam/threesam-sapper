<script>
  import imageBuilder from '../utils/imageUrlBuilder'
  import { stores } from '@sapper/app';
	const { page } = stores();
  export let data

  let width

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
    height: 400px;
    padding: 2rem;
		border-radius: 13px;
    overflow: hidden;
    margin-bottom: 2rem;
  }
  h2 {
    font-size: 2rem;
    text-shadow: 0 0 3px black;
    margin: 0;
    text-align: center;
  }
  img {
    position: absolute;
    top: -10%;
    left: -10%;
    width: 120%;
    height: 120%;
    z-index: -10;
    object-fit: cover;
    filter: brightness(40%);
  }
</style>

<ul>
  {#each data as {slug, title, image: src, alt, palette, description, href}}
    <li><a 
      style={`border: 0.125rem solid ${palette};`}
      rel="prefetch" 
      href="{$page.path}/{slug}">
      <h2>{title}</h2>
      {#if description}
        <p>{description}</p>
      {/if}
      {#if href}
        <a href={href}>visit site</a>
      {/if}
      <img 
        {width} 
        height="400" 
        use:parentWidth 
        src={imageBuilder(src).width(width).height(400).auto('format').url()} 
        {alt} 
        loading="lazy" 
      />
    </a></li>
  {/each}
</ul>