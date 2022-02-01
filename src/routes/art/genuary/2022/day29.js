import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day29 = (p5) => {
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
  const density = 25
  const space = smallSide / density

  p5.setup = () => {
    p5.createCanvas(w, h, p5.WEBGL)
    p5.noiseSeed(seed)
    p5.angleMode(p5.DEGREES)
    p5.ortho()

    for (let x = start; x < end; x += space) {
      for (let y = start; y < end; y += space) {
        for (let z = start; z < end; z += space) {
          const dist = p5.dist(x, y, z, 0, 0, 0)
          const noise = p5.noise(x * multi + smallSide, y * multi + smallSide, z * multi + smallSide)
          const color = p5.map(noise, 0, 1, 0, 255)
          const alpha = p5.map(dist, 0, 200, 255, 0)
          const isShown = p5.map(dist, 0, 300, 0.5, 1)
          // const alpha = p5.dist(x, y, 0, 0) > smallSide / 2 * 1.4 ? 255 : 0
          if (dist < 300) {
            vectors.push({
              x: x + p5.random(- 10, 10),
              y: y + p5.random(- 10, 10),
              z: z + p5.random(- 10, 10),
              color: color,
              alpha
            })
          }
        }
      }
    }
    console.log(vectors)
    // p5.shuffle(vectors, true)
    p5.noLoop()
    p5.background(getStyle('--background'))
  }

  p5.draw = () => {
    p5.rotateX(-22.5)
    p5.rotateY(45)

    vectors.forEach(({ x, y, z, color, alpha }) => {
      p5.push()
      p5.stroke(255 - color)
      p5.fill(color)
      // p5.noFill()
      p5.translate(x, y, z)
      p5.box(space + p5.random(-13, 13))
      p5.pop()
    })
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h, p5.WEBGL)
  }

  p5.keyPressed = () => {
    if (p5.key === 'p') {
      console.log('downloading')
      p5.saveCanvas(`fingerprintplanet-s${seed}`, 'png')
    }
  }
}