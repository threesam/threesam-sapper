import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day16 = (p5) => {
  p5.disableFriendlyErrors = true

  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const padding = 0.5
  const smallSide = w > h ? h * padding : w * padding
  const seed = 216908 // Math.floor(p5.random(1000000))
  console.log('seed', seed)

  const vectors = []
  const multi = 0.1
  const start = -smallSide / 2
  const end = smallSide / 2

  const increment = 3

  p5.setup = () => {
    p5.createCanvas(w, h, p5.WEBGL)
    p5.noiseSeed(seed)
    p5.rectMode(p5.CENTER)

    for (let x = start; x < end; x += increment) {
      for (let y = start; y < end; y += increment) {
        const scaler = p5.map(y, start, end, 0, 1)
        const r = 0
        if (Math.random() > scaler) {
          vectors.push({
            x,
            y,
            r,
            g: p5.map(x, start, end, 100, 50),
            b: p5.map(y, start, end, 100, 50),
          })
        } else {
          const noise = p5.noise(x * multi, y * multi)
          const color = p5.map(p5.sq(noise), 0, 1, 0, 200)
          vectors.push({
            x,
            y,
            r: color,
            g: 0,
            b: color
          })
        }
      }
    }
    p5.noLoop()
  }

  p5.draw = () => {
    p5.background(getStyle('--background'))

    vectors.forEach(({ x, y, r, g, b }) => {
      p5.stroke(r, g, b)
      p5.point(x, y)
    })
    // p5.noFill()
    // p5.stroke(255)
    // p5.square(0, 0, end * 2 + 2)
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h, p5.WEBGL)
  }

  p5.keyPressed = () => {
    if (p5.key === 'p') {
      console.log('downloading')
      p5.saveCanvas(`gradients-${increment}-s${seed}`, 'png')
    }
  }
}