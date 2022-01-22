import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const sketch = (p5) => {
  p5.disableFriendlyErrors = true

  const colors = [[254, 109, 115], [23, 195, 178], [255, 203, 119]]
  const shapes = ['box', 'sphere']

  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const padding = 0.75
  const smallSide = w > h ? h * padding : w * padding
  const seed = Math.floor(p5.random(1000000))

  const vectors = []
  const multi = 0.0069
  const start = -smallSide / 2
  const end = smallSide / 2
  const density = 10
  const space = smallSide / density

  p5.setup = () => {
    p5.createCanvas(w, h, p5.WEBGL)
    p5.noiseSeed(seed)
    p5.angleMode(p5.DEGREES)
    p5.ortho()

    for (let x = start; x < end; x += space) {
      for (let y = start; y < end; y += space) {
        for (let z = start; z < end; z += space) {
          const noise = p5.noise(x * multi + smallSide, y * multi + smallSide, z * multi + smallSide)
          const colorIndex = Math.floor(p5.random(colors.length))
          const shapeIndex = Math.floor(p5.random(shapes.length))
          const color = colors[colorIndex]
          const shape = shapes[shapeIndex]
          const alpha = p5.map(y, start, end, 69, 255)
          const distFromCenter = p5.dist(x, y, z, 0, 0, 0)
          const isRendered = distFromCenter > smallSide / 2
          if (!isRendered) {
            vectors.push({
              x: x + p5.random(-10, 10),
              y: y + p5.random(-10, 10),
              z: z + p5.random(-10, 10),
              bw: p5.random(space / 5),
              bh: p5.random(space / 5),
              bd: p5.random(space / 5),
              dx: Math.floor(p5.random(3, 6)),
              dy: Math.floor(p5.random(3, 6)),
              color,
              alpha,
              shape
            })
          }
        }
      }
    }
  }

  p5.draw = () => {
    p5.frameRate(30)
    p5.background(getStyle('--background'))
    if (p5.frameCount < 360 * 4) {
      p5.rotateX(-11.25)
      p5.rotateY(11.25 + p5.frameCount / 4)

      vectors.forEach(({ x, y, z, bw, bh, bd, color, alpha, shape, dx, dy }) => {
        p5.push()
        p5.translate(x, y, z)
        p5.stroke(...color)
        p5.noFill()
        p5.box(bw, bh, bd)
        p5.pop()
      })

      // p5.saveCanvas(`img${p5.frameCount.toString().padStart(4, '0')}`, 'png')
    }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h, p5.WEBGL)
  }

  p5.keyPressed = () => {
    if (p5.key === 'p') {
      console.log('downloading')
      p5.saveCanvas(`3colors-s${seed}`, 'png')
    }
  }
}