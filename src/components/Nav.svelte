<script>
	import { stores } from '@sapper/app';
	const { page } = stores();
	const segment = page.path

	import SocialLinks from './SocialLinks.svelte'
</script>

<style>
header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  color: var(--headerTextColor);
  height: var(--headerHeight);
  background: var(--headerBackground);
  box-shadow: var(--level-2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--containerPadding);
  z-index: 10;
}

header nav a {
  color: inherit;
  text-decoration: none;
}

header nav a + a,
header nav div {
  margin-left: 10px;
}

div {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	margin: 0;
}

	a {
		font-family: var(--headingFont);
		font-weight: 100;
	}
	.active {
		font-weight: 900;
	}
</style>

<header>
	<a class="logo" aria-current="{segment === undefined ? 'page' : undefined}" href=".">threesam</a>

	<div>
		<SocialLinks />
	</div>

	<nav>
		<a rel="prefetch" class={segment === "about" ? 'active' : ""} aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about me</a>
		<!-- <a href="#{$page.path ? $page.path : 'home'}-contact">contact</a> -->
	</nav>
		
</header>