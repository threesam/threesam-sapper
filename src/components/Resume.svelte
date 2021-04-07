<script lang="ts">
	export let resume
	const {url, date} = resume

	import { format, parseISO} from 'date-fns'
</script>

<style>
	div {
		margin-top: 4rem;
		padding: 2rem;
		border: var(--line);
		border-radius: var(--borderRadius);
		box-shadow: var(--level-2);
	}
	p {
		margin: 0 0 1rem 0;
	}
	span {
		font-size: var(--smallText);
	}
</style>

<div>
	<p>For information regarding professional experience check out my <a href={url} target="_blank">resume.</a></p>
	<span><em>updated {format(parseISO(date), 'yyyy-MM-dd')}</em></span>
</div>

