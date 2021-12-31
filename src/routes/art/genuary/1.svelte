<script>
  // import 
  import {onMount} from 'svelte'
  import {getHeaderHeightPixels, getStyle} from '../../../utils/artStuff'

  let name = 'Day 1'
  let tech = {
    name: 'p5js',
    link: 'https://p5js.org/'
  }

  // dynamic import when client available
  let p5Component
  onMount(async () => {
    const mod = await import("../../../components/CanvasP5.svelte")
    p5Component = mod.default
  })

  // THE SKETCH
  const sketch = (p5) => {
    const w = document.body.offsetWidth // viewport width
    const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
    const isLandscape = w > h

    let objects = []
    const makeCircle = () => {
      const maxRadius = isLandscape ? h/3 : w/3
      return {
        coordinates: [p5.random(-maxRadius, maxRadius), p5.random(-maxRadius, maxRadius)],
        diameter: p5.random(13, 69),
        color: [0, 0, p5.random(200, 255)], // shade of blue
        alpha: p5.random(50, 100),
        isDifferent: false
      }
    }
    
    p5.setup = () => {
      p5.createCanvas(w, h)

      // determine amount of circles based on viewport
      const circleAmount = () => {
        const pixels = isLandscape ? h : w
        return pixels > 500 ? pixels/2 : pixels / 4
      }

      // create circles
      for(let i = 0; i < circleAmount(); i++) {
        objects.push(makeCircle())
      }

      // make one unique
      objects = objects.map((object, i) => {
        const pad = Math.floor(objects.length / 5)
        if(i === objects.length - pad) {
          object.isDifferent = true
        }
        return object
      })
    }
    
    p5.draw = () => {
      p5.background(getStyle('--background'))

      p5.translate(w / 2, h / 2) // center composition
      p5.noStroke()

      // render stored circles
      objects.forEach(({coordinates, diameter, color, alpha, isDifferent}) => {
        if(!isDifferent) {
          p5.fill(...color, alpha)
        } else {
          p5.fill(getStyle('--textColor')) // render the unique circle
        }

        p5.ellipse(...coordinates, diameter)
      })
    }

    p5.windowResized = () => {
      p5.resizeCanvas(w, h)
    }
  }
</script>

<svelte:component this={p5Component} {sketch} id="sketch"/>
<div class="badge">
  <h1>{name}</h1>
  <p>made with <a href={tech.link}>{tech.name}</a></p>
</div>
<p class="back">
  <a href="/art/genuary">all sketches</a>
</p>

<style>
  .badge {
    position: absolute;
    color: var(--textColor);
    padding: 3rem 1.5rem 1.5rem 1.5rem;
    bottom: 0;
    left: 0;
    width: 100%;
    background: linear-gradient(rgba(0,0,0,0), var(--background));
    /* clip-path: polygon(0 0, 100% 100%, 100% 100%, 0 100%); */
    /* opacity: 0.5; */
  }
  .back {
    position: absolute;
    color: var(--textColor);
    padding: 1.5rem;
    top: var(--headerHeight);
    left: 0;
    width: 100%;
    background: linear-gradient(var(--background), rgba(0,0,0,0));
    /* clip-path: polygon(0 0, 100% 100%, 100% 100%, 0 100%); */
    /* opacity: 0.5; */
  }
  h1, p {
    margin: 0;
    line-height: 1;
  }
</style>