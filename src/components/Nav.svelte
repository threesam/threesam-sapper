<script>
	import { stores } from '@sapper/app';
	const { page } = stores();
	const segment = page.path
</script>

<style>
	a {
		font-weight: 100;
	}
	.active {
		font-weight: 900;
	}
</style>

<header>
	<a class="logo" aria-current="{segment === undefined ? 'page' : undefined}" href=".">threesam</a>

	<nav>
		<a rel="prefetch" class={segment === "about" ? 'active' : ""} aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a>
		<a rel="prefetch" class={segment === "thoughts" ? 'active' : ""} aria-current="{segment === 'thoughts' ? 'page' : undefined}" href="thoughts">thoughts</a>
		<a rel="prefetch" class={segment === "projects" ? 'active' : ""} aria-current="{segment === 'projects' ? 'page' : undefined}" href="projects">projects</a>
	</nav>
		
</header>