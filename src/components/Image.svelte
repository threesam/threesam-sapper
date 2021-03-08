<script>
  export let url;
  export let alt;
</script>

<style>
  img {
    filter: brightness(90%);
  }
</style>

<img src={url} {alt} loading="lazy"/>
