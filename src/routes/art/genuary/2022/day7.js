import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day7 = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const isLandscape = w > h ? h : w
  const seed = Math.floor(p5.random(1000000))

  const vectors = []

  const halfTotal = isLandscape / 2 * 0.9
  const increment = 20

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)

    for (let i = 0; i < halfTotal; i += increment) {
      const vector = {
        x: p5.random(-halfTotal, halfTotal),
        y: p5.random(-halfTotal, halfTotal)
      }
      vectors.push(vector)
    }
  }

  p5.draw = () => {
    p5.background(getStyle('--background'))
    p5.translate(w / 2, h / 2) // center composition

    vectors.forEach((vector, index) => {
      const { x, y } = vector
      const count = Math.sin(p5.frameCount * 0.0069 + index)

      // color
      const r = p5.map(x, -halfTotal, halfTotal, 100, 0)
      const g = p5.map(y, -halfTotal, halfTotal, 100, 255)
      const b = p5.map(x, -halfTotal, halfTotal, 100, 255)
      const a = p5.map(count, 0, 1, 0, 255)

      vectors.forEach(otherVector => {
        p5.stroke(r, g, b, a)
        p5.line(count * x, count * y, otherVector.x, otherVector.y)
      })
    })
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.keyPressed = () => {
    if (p5.key === 'p') {
      console.log('downloading')
      p5.saveCanvas(`sol-lewitt-118-s${seed}`, 'png')
    }
  }
}