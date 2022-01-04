import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day2 = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const isLandscape = w > h

  const ringsAmount = 100
  const rings = []

  const seed = Math.floor(p5.random(1000000))

  p5.setup = () => {
    p5.createCanvas(w, h)

    p5.noiseSeed(seed)

    for (let i = 0; i < ringsAmount; i++) {
      // const r = p5.map(p5.noise(0.069 * i + 1), 0, 1, 0, 255)
      // const g = p5.map(p5.noise(0.069 * i + 2), 0, 1, 0, 255)
      // const b = p5.map(p5.noise(0.069 * i + 3), 0, 1, 0, 255)
      const a = p5.map(p5.noise(0.069 * i + 4), 0, 1, 0, 255)
      rings.push({
        // r,
        // g,
        // b,
        a
      })
    }
  }

  p5.draw = () => {
    p5.background(getStyle('--background'))
    p5.translate(w / 2, h / 2) // center composition
    if (!isLandscape) {
      p5.rotate(p5.PI / 2)
    }

    const MIN_SCREEN = 300
    const MAX_SCREEN = 2000
    const multi = p5.map(w, MIN_SCREEN, MAX_SCREEN, 0.5, 5)
    const pad = 0.69
    const diameter = isLandscape ? pad * h : pad * w
    const strokeColor = getStyle('--background').trimStart() === '#000' ? 255 : 0

    p5.noFill()
    for (let i = 0; i < ringsAmount; i++) {
      p5.stroke(strokeColor, rings[i].a)
      p5.ellipse(
        (-multi * ringsAmount) + (i * 2 * multi),
        0,
        diameter,
        -diameter + p5.map(i, 0, ringsAmount, 0, 2 * diameter), // yikes - magically responsive math
      )
    }

  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.mouseClicked = () => {
    console.log('downloading')
    p5.saveCanvas(`rings-s${seed}`, 'png')
  }
}