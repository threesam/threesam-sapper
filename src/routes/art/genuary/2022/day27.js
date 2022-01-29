import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day27 = (p5) => {
  p5.disableFriendlyErrors = true

  const palette = ['#2E294E', '#541388', '#F1E9DA', '#FFD400', '#D90368']

  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const padding = 1
  const smallSide = w > h ? h * padding : w * padding
  const seed = Math.floor(p5.random(1000000))

  const vectors = []
  const multi = 0.025
  const start = - smallSide * 0.4
  const end = smallSide * 0.4
  const density = 50
  const space = smallSide / density

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)
    p5.rectMode(p5.CENTER)

    for (let x = start; x < end; x += space) {
      for (let y = start; y < end; y += space) {
        const noise = p5.noise(
          x * multi,
          y * multi
        )

        const size = Math.floor(p5.map(noise, 0, 1, space * 0.69, space * 1.5))
        const g = Math.floor(p5.map(noise, 0, 1, 100, 200))
        const b = Math.floor(p5.map(noise, 0, 1, 130, 255))
        const a = Math.floor(p5.map(y, start, end, 255, 10))
        if (p5.dist(x, y, 0, 0) < end) {
          vectors.push({
            x,
            y,
            size,
            color: palette[Math.floor(p5.random(palette.length))],
            r: 0,
            g,
            b,
            a
          })
        }
      }
    }
  }

  p5.draw = () => {
    const count = p5.frameCount / 60
    const offset = count
    p5.background(0)
    p5.translate(w / 2, h / 2)
    // p5.rotate(p5.PI / 4)

    vectors.forEach(({ x, y, size, color, r, g, b, a }) => {
      const fromCenter = p5.dist(x, y, 0, 0)
      const waveX = p5.map(fromCenter, 0, smallSide / 2, 31, 0)
      const waveY = p5.map(y, start, end, 10, 0)

      const xoff = p5.cos(-fromCenter + offset) * -waveX
      const yoff = p5.tan(fromCenter + offset)

      p5.stroke(0, a)
      // p5.fill(r, g, b, a)
      p5.fill(color)
      p5.square(
        x - xoff,// + (p5.sin(y * 0.41 + offset) * waveX),
        y - xoff,// + (p5.sin(x * 0.41 + offset) * waveX),
        size + xoff
      )
    })
    // if (p5.frameCount < p5.TWO_PI * 60) {
    //   // p5.frameRate(5)
    //   // p5.saveCanvas(`img${p5.frameCount.toString().padStart(4, '0')}`, 'png')
    // } else {
    //   p5.noLoop()
    // }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.keyPressed = () => {
    if (p5.key === 'p') {
      console.log('downloading')
      p5.saveCanvas(`seaofshapes-s${seed}`, 'png')
    }
  }
}