<script>
	import { stores } from '@sapper/app';
	const { page } = stores();
	const segment = page.path

	import SocialLinks from './SocialLinks.svelte'
</script>

<style>
header {
	display: relative;
}

div {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	margin: 0;
}

	a {
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
		<a rel="prefetch" class={segment === "about" ? 'active' : ""} aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a>
		<!-- <a href="#{$page.path ? $page.path : 'home'}-contact">contact</a> -->
	</nav>
		
</header>