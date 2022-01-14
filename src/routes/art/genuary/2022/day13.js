import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day13 = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const isLandscape = w > h
  const seed = Math.floor(p5.random(1000000))

  const outerRings = []
  let innerRings = []
  let smallestRing

  p5.setup = () => {
    p5.createCanvas(w, h, p5.WEBGL)
    p5.noiseSeed(seed)
    p5.angleMode(p5.DEGREES)
    for (let i = 0; i < 100; i++) {
      const y = p5.map(i, 0, 100, -h / 2 * 0.9, h / 2 * 0.9)
      const size = h / 10 - p5.map(p5.noise(i * 0.08), 0, 1, 0, 30)
      const a = p5.map(p5.dist(0, y, 0, 0), h / 8, h / 2, 0, 50) //p5.map(this.y, -h / 2, h / 2, -255, 255)
      outerRings.push({
        x: 0,
        y,
        size,
        a
      })
    }
    smallestRing = outerRings.map(ring => ring.size).sort((x, y) => x - y).shift()
  }

  p5.draw = () => {
    p5.background(getStyle('--background'))

    outerRings.forEach(({ x, y, size, a }) => {
      p5.push()

      p5.noFill()
      p5.translate(x, y, 0)
      p5.rotateX(100)
      if (a > 0) {
        p5.stroke(255, a)
      } else {
        p5.noStroke()
      }
      p5.circle(0, 0, size)

      p5.pop()
    })

    if (p5.frameCount % 4 === 0) {
      const type = p5.random() > 1 / 4 ? 'hemoglobin' : 'mitochondria'
      innerRings.push(new Shape(
        p5.random(3, 7),
        1,
        p5.random(-smallestRing / 2 + 10, smallestRing / 2 - 10),
        -h / 2,
        0,
        type
      ))
    }

    innerRings.filter(ring => ring.y < h / 2 - 1).map(ring => {
      ring.update()
    })
    p5.frameRate(24)
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.mouseClicked = () => {
    console.log('downloading')
    p5.saveCanvas(`80x800-s${seed}`, 'png')
  }

  class Shape {
    constructor(ring, tube, x, y, z, type) {
      this.ringR = ring
      this.tubeR = tube
      this.x = x
      this.y = y
      this.z = z
      this.type = type
      this.rotation = 0
      this.force = Math.floor(p5.random(-3, 3))
      this.acc = p5.random(-0.5, 0.5)
      this.color = p5.random(200, 255)
    }

    draw() {
      p5.push()
      p5.translate(this.x, this.y, this.z)
      p5.noStroke()
      p5.rotateX(this.rotation)
      p5.rotateY(this.rotation * -0.75)
      p5.rotateZ(this.rotation * 0.5)
      const a = p5.map(p5.dist(0, this.y, 0, 0), 0, h / 2, 0, 255)
      if (this.type === 'mitochondria') {
        p5.fill(255, 255 - Math.abs(a))
        p5.sphere(this.ringR / 2)
      } else {
        p5.fill(this.color, 0, 0, 255 - Math.abs(a))
        p5.torus(this.ringR, this.tubeR)
      }
      p5.pop()
    }

    update() {
      this.y++
      this.y += this.acc
      this.rotation += this.force
      this.draw()
    }
  }
}