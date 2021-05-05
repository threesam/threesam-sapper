<script>
  import Contact from './Contact.svelte'
   import {onMount} from 'svelte'
   import { stores } from '@sapper/app';
	const { page } = stores();
  
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
  })
</script>

<style>
  footer {
    display: grid;
    place-content: center;
    height: 90vh;
    width: 100%;
    position: relative;
    overflow: hidden;
    clip-path: polygon( 0 0, 100% calc(1rem + 25px), 100% 100%, 0 100%);
    background: linear-gradient(var(--footerBackground), var(--footerBackgroundFade));
    color: var(--footerTextColor);
  }

  p {
    position: absolute;
    bottom: var(--containerPadding);
    width: 100%;
    text-align: center;
    color: var(--textColor);
    font-family: var(--headingFont);
    max-width: none;
  }
</style>

<footer id="contact">
  <Contact/>
  <p>© threeSam development 2018-2021</p>
</footer>