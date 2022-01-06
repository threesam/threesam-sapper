import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const sketch = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const isLandscape = w > h
  const seed = Math.floor(p5.random(1000000))

  const vectors = []

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)

    const halfTotal = 400
    const increment = 25
    const multi = 0.001

    for (let x = -halfTotal; x < halfTotal; x += increment) {
      for (let y = -halfTotal; y < halfTotal; y += increment) {
        const pad = p5.map(p5.noise(x, y), 0, 1, 0, 19)
        const vector = [x, y]
        const size = increment//p5.map(p5.noise(x * multi, y * multi), 0, 1, 0, increment)
        vectors.push({ vector, size, halfTotal, pad })
      }
    }
  }

  p5.draw = () => {
    p5.background(getStyle('--background'))
    p5.translate(w / 2, h / 2) // center composition

    vectors
      .forEach(({ vector, size, halfTotal, pad }, index) => {
        const [x, y] = vector

        // color
        const r = p5.map(x, 0, w, 100, 200)
        const g = p5.map(y, 0, h, 10, 100)
        const b = p5.map(y, 0, w, 50, 10)
        const a = p5.map(p5.dist(w / 2, h / 2, x, y), 0, 500, 255, 0)

        p5.fill(255)
        // p5.strokeWeight(5)
        if (x >= 0 && y <= 0) {
          const scaled = p5.map(x, -halfTotal, halfTotal, 0, 10)
          // p5.fill(r, g, b)
          p5.rect(x + scaled, y + scaled, size - pad - scaled, size - pad - scaled)

        } else {
          // p5.rect(x, y, size, size)
          const scaled = p5.map(x, -halfTotal, halfTotal, 0, 10)
          // p5.rect(x, y, size - scaled, size - scaled)
          p5.rect(x + scaled, y + scaled, size - pad - scaled, size - pad - scaled)
        }
      })
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.mouseClicked = () => {
    console.log('downloading')
    p5.saveCanvas(`flowfield-s${seed}`, 'png')
  }
}