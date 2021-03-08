<script>
	export let segment;
</script>

<style>
	nav a  {
		opacity: 0.7;
	}
	.active {
		color: var(--textColor);
		text-decoration: none;
		opacity: 1;
	}
</style>

<header>
	<a class="logo" aria-current="{segment === undefined ? 'page' : undefined}" href=".">threesam</a>

	<nav>
		<a rel="prefetch" class={segment === "projects" ? 'active' : ""} aria-current="{segment === 'projects' ? 'page' : undefined}" href="projects">projects</a>
		<a rel="prefetch" class={segment === "sounds" ? 'active' : ""} aria-current="{segment === 'sounds' ? 'page' : undefined}" href="sounds">sounds</a>
		<a rel="prefetch" class={segment === "blog" ? 'active' : ""} aria-current="{segment === 'blog' ? 'page' : undefined}" href="blog">blog</a>
		<a rel="prefetch" class={segment === "about" ? 'active' : ""} aria-current="{segment === 'about' ? 'page' : undefined}" href="about">about</a>
	</nav>
		
</header>