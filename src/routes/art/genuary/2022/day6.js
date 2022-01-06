import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day6 = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const isLandscape = w > h
  const seed = Math.floor(p5.random(1000000))

  const centerW = w / 2
  const centerH = h / 2

  const vectors = []

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)

    const increment = 50
    const multi = 1

    for (let x = increment / 4; x < w; x += increment) {
      for (let y = increment / 4; y < h; y += increment) {
        const pad = p5.map(p5.noise(x, y), 0, 1, 0, 19)
        const vector = [x, y]
        const size = p5.map(p5.noise(x * multi, y * multi), 0, 1, increment * 0.6, increment) + p5.random(-3, 3)
        const eyes = {
          lx: x - size / 5,
          rx: x + size / 5,
          y: y - size / 6,
          lSize: p5.random(size / 7, size / 13),
          rSize: p5.random(size / 7, size / 13)
        }
        vectors.push({ vector, size, eyes, pad })
      }
    }
    p5.shuffle(vectors, true)
  }

  p5.draw = () => {
    p5.background(getStyle('--background'))

    vectors
      .forEach(({ vector, size, eyes, pad }, index) => {
        const [x, y] = vector

        const mX = w > 768 ? p5.mouseX : undefined // turn off for mobile
        const mY = w > 768 ? p5.mouseY : undefined
        const distFromCenter = p5.dist(mX ?? centerW, mY ?? centerH, x, y)
        const smallSide = isLandscape ? h : w
        const spotlight = h / 2 * 0.8

        // color
        const r = p5.map(x, 0, w, 200, 255)
        const a = p5.map(distFromCenter, 0, spotlight, 255, 0)

        const eyeMulti = p5.map(distFromCenter, 0, spotlight, 2, 0.5)

        p5.fill(r, r, 0, a) // yellow
        p5.circle(x, y, size)
        p5.fill(0)
        p5.circle(eyes.lx, eyes.y, eyes.lSize * eyeMulti)
        p5.circle(eyes.rx, eyes.y, eyes.rSize * eyeMulti)
        p5.strokeWeight(3)
        const halfLine = p5.map(distFromCenter, spotlight, 0, size / 5, size / 15)
        p5.line(x - halfLine, y + halfLine, x + halfLine, y + halfLine)
      })
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.mouseClicked = () => {
    console.log('downloading')
    p5.saveCanvas(`wheremyfriendsat-s${seed}`, 'png')
  }
}