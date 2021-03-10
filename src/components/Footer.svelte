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
      div.style.top = `${h}`
      div.style.right = `${Math.log(w) * Math.random()}`

      div.style.height = `${Math.log(h) + h}%`
      div.style.width = `${Math.log(w) + w}%`
      div.style.border = "0.25rem solid var(--darkGrey)"
      div.style.borderRadius = "13px"


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