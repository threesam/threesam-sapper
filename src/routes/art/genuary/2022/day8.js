import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day8 = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const isLandscape = w > h ? h : w
  const seed = Math.floor(p5.random(1000000))

  let vectors = []
  let half = isLandscape / 2 * 0.5
  const increment = 10

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)

    const multi = 0.1

    for (let x = -half; x < half; x += increment) {
      const angle = p5.map(x, -half, half, 0, Math.PI)
      const sin = Math.sin(angle) * 155
      for (let i = Math.floor(Math.abs(x) / 10); i < Math.floor(half / 10); i++) {
        const noise = p5.map(p5.noise(i), 0, 1, 1, 1.5)
        const damp = p5.map(i, Math.abs(x) / 10, half, 0, (half - Math.abs(x)))
        const thing = p5.random(damp * 1.5)
        const vector = [
          x - sin + p5.random(-damp, increment),
          x + sin - p5.random(-damp, increment),
          x - sin + p5.random(-damp, increment) + thing,
          x + sin - p5.random(-damp, increment) - thing,
          noise
        ]

        vectors.push({ vector })
      }
    }
    console.log(vectors)
  }

  p5.draw = () => {
    p5.background(getStyle('--background'))
    p5.translate(w / 2, h / 2) // center composition
    p5.rotate(Math.PI / 4)

    vectors.forEach(({ vector }, i) => {
      const [x, y, x2, y2, noise] = vector
      const a = p5.map(i, 0, vectors.length, 0, 255)
      p5.push()
      p5.stroke(255)
      p5.strokeWeight(2)
      const angle = p5.map(i, 0, vectors.length, 0, Math.PI / 8)
      p5.line(x, y, x2, y2)
      p5.pop()
      p5.stroke(30)
      p5.line(x, y, 0, 0)
    })
    p5.fill(255)
    p5.circle(0, 0, 40)
    p5.fill(0)
    // p5.stroke(255, 100)
    p5.circle(0 + 4, 0 - 4, 40)

  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.keyPressed = () => {
    if (p5.key === 'p') {
      console.log('downloading')
      p5.saveCanvas(`crescent-s${seed}`, 'png')
    }
  }
}