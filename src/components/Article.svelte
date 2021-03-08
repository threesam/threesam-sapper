<script>
  import Hero from './Hero.svelte'
  import Container from './Container.svelte'
  import BlockContent from '@movingbrands/svelte-portable-text'
  import serializers from '../components/serializers'

  export let data
</script>

<Hero {data}>
  <slot name="hero"/>
</Hero>

<Container>
  <slot name="before-blocks"/>
  <BlockContent blocks={data.body || data.caseStudy} {serializers} />
  <slot name="after-blocks"/>
</Container>

