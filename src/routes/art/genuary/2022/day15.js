import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day15 = (p5) => {
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
  const density = 200
  const space = smallSide / density

  p5.setup = () => {
    p5.createCanvas(w, h, p5.WEBGL)
    p5.noiseSeed(seed)
    p5.angleMode(p5.DEGREES)
    p5.ortho()

    for (let x = start; x < end; x += 10) {
      for (let y = start; y < end; y += 10 * 10) {
        for (let z = start; z < end; z += 10) {
          const noise = p5.noise(x * multi + smallSide, y * multi + smallSide, z * multi + smallSide)
          const color = p5.map(noise, 0, 1, 0, 255)
          const alpha = p5.map(y, start, end, 69, 255)
          // const alpha = p5.dist(x, y, 0, 0) > smallSide / 2 * 1.4 ? 255 : 0
          if (color > 0) {
            vectors.push({
              x,
              y: y + (y < end - 100 && p5.random() > .999 ? p5.random(25, 75) : 0),
              // x: x + p5.map(p5.noise(x), 0, 1, -10, 10),
              // y: y + p5.map(p5.noise(y), 0, 1, -10, 10),
              z,
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
  }

  p5.draw = () => {
    p5.background(getStyle('--background'))
    p5.rotateX(-22.5)
    p5.rotateY(45)

    vectors.forEach(({ x, y, z, color, alpha }) => {
      p5.stroke(color, alpha)
      p5.point(x, y, z)
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