<script>
  import Contact from './Contact.svelte'
   import {onMount} from 'svelte'
  
  onMount(()=> {
    const section = document.querySelector('footer')
    // section.appendChild(document.createTextNode("Text"))

    function createDiv(w, h) {

      const div = document.createElement("div");
      // give style
      div.style.position = "absolute"
      div.style.top = `0`
      div.style.margin = `${0.69*w}rem`

      div.style.height = `${Math.log(h) *25}%`
      div.style.width = `${Math.log(w) + (69 * Math.random())}%`
      div.style.border = "0.25rem solid var(--primary)"
      div.style.borderRadius = `${0.69*h}px`
      div.style.opacity = `${0.00069* h}`


      div.style.zIndex = `0`

      
      section.prepend(div)
    }


    for (var i = 100; i > 0; i--) {
      createDiv(i, 2*i)
      i--
    }
  }
  )
</script>

<style>
  footer {
    display: grid;
    place-content: center;
    height: 100vh;
    width: 100%;
    position: relative;
    overflow: hidden;
  }
</style>

<footer>
  <Contact/>
</footer>