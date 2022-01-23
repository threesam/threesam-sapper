import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day4 = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const isLandscape = w > h

  const vectors = []

  const seed = Math.floor(p5.random(1000000))

  const multi = 0.0027

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.background(getStyle('--background'))
    p5.noiseSeed(seed)
    p5.noiseDetail(1)
    p5.angleMode(p5.DEGREES)

    const density = 69
    const space = w / density

    for (let x = 0; x < w; x += space) {
      for (let y = 0; y < h; y += space) {
        const vector = p5.createVector(x + p5.random(-31, 31), y + p5.random(-31, 31))
        vectors.push(vector)
      }
    }

    p5.shuffle(vectors, true)
  }

  p5.draw = () => {
    // p5.noStroke()

    const max = p5.frameCount <= vectors.length ? p5.frameCount : vectors.length
    vectors
      .slice(0, max) // space out first paints
      .forEach((vector, index) => {
        const { x, y } = vector
        // angle
        const angle = p5.map(p5.noise(x * multi, y * multi), 0, 1, 0, 720)
        vector.add(p5.createVector(Math.cos(angle), Math.sin(angle)))


        // color
        const r = p5.map(x, 0, w, 100, 200)
        const g = p5.map(y, 0, h, 10, 100)
        const b = p5.map(y, 0, w, 50, 10)
        const a = p5.map(p5.dist(w / 2, h / 2, x, y), 0, 500, 255, 0)

        p5.stroke(255, 13)

        // create shape
        // if (p5.dist(w / 2, h / 2, x, y) < 500) {
        //   p5.circle(x, y, 1)
        // }
        const pad = 0 //p5.random(-2, 2)
        const halfLength = 5
        p5.line(
          x + pad,
          y + pad,
          x + halfLength - pad,
          y - halfLength - pad)
      })
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.keyPressed = () => {
    if (p5.key === 'p') {
      console.log('downloading')
      p5.saveCanvas(`flowfield-s${seed}`, 'png')
    }
  }
}