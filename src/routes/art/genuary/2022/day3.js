import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day3 = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const isLandscape = w > h

  const triangles = []

  const seed = Math.floor(p5.random(1000000))

  p5.setup = () => {
    p5.createCanvas(w, h)

    p5.noiseSeed(seed)

    for (let i = 0; i < 500; i++) {
      const shift = p5.map(p5.noise(i * 0.01), 0, 1, 5, 15)
      const alpha = p5.map(p5.noise(i * 0.01), 0, 1, 100, 255)
      const coords = {
        x1: 0 - i * shift,
        y1: 0 - i * shift * 0.5,
        x2: 0 + i * shift,
        y2: 0 - i * shift * 0.5,
        x3: 0,
        y3: 0 + i * shift
      }
      triangles.push({
        alpha,
        coords: [...Object.values(coords)]
      })
    }
  }

  p5.draw = () => {
    p5.background(getStyle('--background'))
    p5.translate(w / 2, h / 2) // center composition

    p5.noFill()
    triangles.slice(1, triangles.length).reverse().forEach((triangle, i) => {
      p5.push()
      p5.rotate(p5.map(p5.noise(i * 0.01), 0, 1, p5.PI / 5, p5.PI))
      p5.stroke(triangle.alpha)
      p5.triangle(...triangle.coords)
      p5.pop()
    })
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.mouseClicked = () => {
    console.log('downloading')
    p5.saveCanvas(`trianglespace-s${seed}`, 'png')
  }
}