import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day14 = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const smallSide = w > h ? h : w

  const vectors = []

  const seed = Math.floor(p5.random(1000000))

  const density = 200
  const padding = 0.7
  const space = smallSide / density * padding

  const left = w / 2 - (smallSide / 2 * padding)
  const right = w / 2 + (smallSide / 2 * padding)
  const bottom = h / 2 - (smallSide / 2 * padding)
  const top = h / 2 + (smallSide / 2 * padding)

  const multi = 0.004

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.background(getStyle('--textColor'))
    p5.noiseSeed(seed)
    p5.noiseDetail(1)
    p5.angleMode(p5.DEGREES)



    for (let x = left; x < right; x += space) {
      for (let y = bottom; y < top; y += space) {
        const vector = p5.createVector(x + p5.random(-31, 31), y + p5.random(-31, 31))
        // Set color
        vector.color = {
          r: p5.random(255),
          g: p5.random(255),
          b: p5.random(255)
        }

        vectors.push(vector)
      }
    }

    p5.shuffle(vectors, true)
  }

  p5.draw = () => {

    const max = p5.frameCount <= vectors.length ? p5.frameCount : vectors.length

    vectors
      .slice(0, max) // space out first paints
      .forEach((vector, index) => {
        const { x, y, color } = vector
        // angle
        const angle = p5.map(p5.noise(x * multi, y * multi), 0, 1, 0, 720)
        vector.add(p5.createVector(Math.cos(angle), Math.sin(angle)))


        // color
        const distFromCenter = p5.dist(w / 2, h / 2, x, y)
        let a
        // if () {
        //   a = 0
        // } else {
        //   a = 130
        // }
        const isCircle = distFromCenter > smallSide / 2 * padding
        const isSquare = x < left || x > right || y > top || y < bottom
        if (isCircle) {
          a = 0
        } else {
          a = 31
        }
        p5.stroke(color.r, color.g, color.b, a)

        // create shape
        // if (p5.dist(w / 2, h / 2, x, y) < 500) {
        //   p5.circle(x, y, 1)
        // }
        const pad = p5.random(-1, 1)
        const halfLength = 0
        p5.line(
          x + pad,
          y + pad,
          x + halfLength - pad,
          y - halfLength
        )
        // p5.point(x, y)
      })
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.keyPressed = () => {
    if (p5.key === 'p') {
      console.log('downloading')
      p5.saveCanvas(`fingerprintplanet-s${seed}-m${multi}`, 'png')
    }
  }
}