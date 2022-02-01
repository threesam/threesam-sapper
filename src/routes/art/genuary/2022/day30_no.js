import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day30 = (p5) => {
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

    const x = 0
    const y = 0

    makeHuman(x, y)
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.keyPressed = () => {
    if (p5.key === 'p') {
      console.log('downloading')
      p5.saveCanvas(`temp-s${seed}-m${multi}`, 'png')
    }
  }

  function makeHuman(x, y) {
    const quarter = 10
    const half = quarter * 2
    const whole = half * 2
    const limbLength = 70
    p5.push()
    // body
    if (p5.random() > p5.random()) p5.rect(x, y, half, 50)
    // arms
    if (p5.random() > p5.random()) p5.rect(x + half, y, quarter, limbLength)
    if (p5.random() > p5.random()) p5.rect(x - quarter, y, quarter, limbLength)
    p5.translate(0, 50)
    // legs
    if (p5.random() > p5.random()) p5.rect(x + quarter, y, quarter, limbLength)
    if (p5.random() > p5.random()) p5.rect(x, y, quarter, limbLength)
    // head
    if (p5.random() > p5.random()) p5.rect(x - quarter, y - 100, whole, whole)

    p5.pop()
  }

}