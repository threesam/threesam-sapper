import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day21 = (p5) => {
  p5.disableFriendlyErrors = true

  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const padding = 0.5
  const smallSide = w > h ? h * padding : w * padding
  const seed = Math.floor(p5.random(1000000))

  const vectors = []
  const multi = 0.025
  const start = - smallSide * 0.4
  const end = smallSide * 0.4
  const density = 20
  const space = smallSide / density

  p5.setup = () => {
    p5.createCanvas(w, h, p5.WEBGL)
    p5.noiseSeed(seed)
    p5.rectMode(p5.CENTER)

    for (let x = start; x < end; x += space) {
      for (let y = start; y < end; y += space) {
        for (let z = start; z < end; z += space) {
          const noise = p5.noise(
            x * multi,
            y * multi,
            z * multi
          )

          const size = Math.floor(p5.map(noise, 0, 1, space * 0.69, space * 1.5))
          const g = Math.floor(p5.map(noise, 0, 1, 100, 200))
          const b = Math.floor(p5.map(noise, 0, 1, 130, 255))
          if (p5.dist(0, 0, 0, x, y, z) < 150) {
            vectors.push({
              x,
              y,
              z,
              size,
              r: 0,
              g,
              b
            })
          }
        }
      }
    }

    console.log(vectors)
  }

  p5.draw = () => {
    const offset = p5.frameCount / 13
    p5.background(0)
    // p5.translate(w / 2, h / 2)
    // p5.rotate(p5.PI / 4)
    p5.rotateY(p5.frameCount / 400)

    vectors.forEach(({ x, y, z, size, r, g, b }) => {
      const waveX = p5.map(x, start, end, 10, 0)
      const waveY = p5.map(y, start, end, 10, 0)
      p5.strokeWeight(size + (p5.sin((x + y + z) * 0.41 + offset) * waveX))
      // p5.stroke(255)
      p5.stroke(r, g, b)
      // p5.circle(
      //   x + (p5.sin(y * 0.41 + offset) * waveX),
      //   y + (p5.sin(x * 0.41 + offset) * waveY),
      //   size + (p5.sin((x + y) * 0.41 + offset) * waveX)
      // )
      // p5.point(
      //   x + (p5.sin(y * 0.41 + offset) * waveX),
      //   y + (p5.sin(z * 0.41 + offset) * waveY),
      //   z + (p5.sin(x * 0.41 + offset) * waveY)
      // )
      p5.point(x, y, z)
    })
    // if (p5.frameCount < p5.TWO_PI * 13) {
    // p5.frameRate(5)
    //   p5.saveCanvas(`img${p5.frameCount.toString().padStart(4, '0')}`, 'png')
    // } else {
    // p5.noLoop()
    // }
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h, p5.WEBGL)
  }

  p5.keyPressed = () => {
    if (p5.key === 'p') {
      console.log('downloading')
      p5.saveCanvas(`seaofshapes-s${seed}`, 'png')
    }
  }
}