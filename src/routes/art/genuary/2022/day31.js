import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day31 = (p5) => {
  p5.disableFriendlyErrors = true

  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const padding = 0.5
  const smallSide = w > h ? h * padding : w * padding
  const seed = Math.floor(p5.random(1000000))

  const vectors = []
  const multi = 0.0069
  const start = -smallSide / 2
  const end = smallSide / 2
  const density = 13
  const space = smallSide / density

  p5.setup = () => {
    p5.createCanvas(w, h, p5.WEBGL)
    p5.noiseSeed(seed)
    // p5.angleMode(p5.DEGREES)
    p5.ortho()

    for (let x = start; x < end; x += space) {
      for (let y = start; y < end; y += space) {
        for (let z = start; z < end; z += space) {
          const dist = p5.dist(x, y, z, 0, 0, 0)
          const noise = p5.noise(x * multi + smallSide, y * multi + smallSide, z * multi + smallSide)
          const color = p5.map(dist, 0, end, 255, 0)
          const alpha = p5.map(dist - 50, 0, 200, 0, 50)
          const isShown = p5.map(dist, 0, 300, 0.5, 1)
          const size = p5.random(space)
          // const alpha = p5.dist(x, y, 0, 0) > smallSide / 2 * 1.4 ? 255 : 0
          if (dist > 0) {
            vectors.push({
              x: x + p5.random(- 10, 10),
              y: y + p5.random(- 10, 10),
              z: z + p5.random(- 10, 10),
              color: color,
              alpha,
              size
            })
          }
        }
      }
    }
    p5.shuffle(vectors, true)
    p5.noLoop()
  }

  p5.draw = () => {
    p5.background(213)
    p5.rotateZ(-22.5)
    // p5.rotateY(p5.frameCount)

    vectors.forEach(({ x, y, z, color, size }) => {
      drawFlower(x, y, z, color, size)
    })

    // drawFlower(0, 0, 1000)
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h, p5.WEBGL)
  }

  p5.keyPressed = () => {
    if (p5.key === 'p') {
      console.log('downloading')
      p5.saveCanvas(`negativespace-s${seed}`, 'png')
    }
  }

  function drawFlower(x, y, z, color, petals) {
    p5.push()
    p5.translate(x, y, z)
    for (let i = 0; i < petals; i++) {
      const angle = p5.map(i, 0, petals, 0, p5.TWO_PI)
      p5.rotateZ(angle)
      p5.stroke(0)
      p5.stroke(color)
      p5.line(0, 0, 0, angle + 100)
    }
    p5.pop()
  }
}