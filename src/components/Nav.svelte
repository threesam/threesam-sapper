<script>
	export let segment;
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
		<a rel="prefetch" class={segment === "things" ? 'active' : ""} aria-current="{segment === 'things' ? 'page' : undefined}" href="things">things</a>
	</nav>
		
</header>