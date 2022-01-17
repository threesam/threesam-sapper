import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const sketch = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const isLandscape = w > h
  const seed = Math.floor(p5.random(1000000))


  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)
  }

  p5.draw = () => {
    p5.background(getStyle('--background'))
    p5.translate(w / 2, h / 2) // center composition

    p5.ellipse(0, 0, 100, 100)
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.keyPressed = () => {
    if (p5.key = 'p') {
      console.log('downloading')
      p5.saveCanvas(`temp-s${seed}-m${multi}`, 'png')
    }
  }
}