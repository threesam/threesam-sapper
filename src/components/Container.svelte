<style>
	section {
		min-height: 100vh;
		position: relative;
    padding: calc(3rem + var(--headerHeight)) var(--containerPadding);
		max-width: 40rem;
		margin: 0 auto;
		/* overflow: hidden; */
	}

	@media (max-width: 50rem) {
		section {
			overflow: hidden;
		}
	}
</style>

<section>
	<slot></slot>
</section>