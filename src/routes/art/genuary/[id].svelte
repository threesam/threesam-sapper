<script context="module">
	export async function preload({
		params,
	}) {
		const { id } = params
		return {
			id,
		}
	}
</script>

<script>
	export let id
	// import
	import { onMount } from 'svelte'

	// get sketch from id
	import sketches from './2022/index'
	const sketch = sketches['day' + id]

	// badge
	let name = `Day ${id}`
	let tech = {
		name: 'p5js',
		link: 'https://p5js.org/',
	}

	// dynamic import when client available
	let p5Component
	onMount(async () => {
		const mod = await import(
			'../../../components/CanvasP5.svelte'
		)
		p5Component = mod.default
	})
</script>

<svelte:component
	this={p5Component}
	{sketch}
	id="sketch"
/>
<div class="badge">
	<h1>{name}</h1>
	<p>
		made with <a href={tech.link}
			>{tech.name}</a
		>
	</p>
</div>
<p class="back">
	<a href="/art/genuary">all sketches</a
	>
</p>

<style>
	.badge {
		position: absolute;
		color: var(--textColor);
		padding: 3rem 1.5rem 1.5rem 1.5rem;
		bottom: 0;
		left: 0;
		width: 100%;
		background: linear-gradient(
			rgba(0, 0, 0, 0),
			var(--background)
		);
	}
	.back {
		position: absolute;
		color: var(--textColor);
		padding: 1.5rem;
		top: var(--headerHeight);
		left: 0;
		width: 100%;
		max-width: unset;
		background: linear-gradient(
			var(--background),
			rgba(0, 0, 0, 0)
		);
	}
	h1,
	p {
		margin: 0;
		line-height: 1;
	}
</style>
