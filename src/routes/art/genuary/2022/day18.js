import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day18 = (p5) => {
  p5.disableFriendlyErrors = true

  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const padding = 0.75
  const smallSide = w > h ? h * padding : w * padding
  const seed = Math.floor(p5.random(1000000))

  const vectors = []
  const multi = 0.25
  const startX = w / 2 - smallSide / 2
  const endX = w / 2 + smallSide / 2
  const startY = h / 2 - smallSide / 2 * 3 / 4
  const endY = h / 2 + smallSide / 2 * 3 / 4
  const density = 13
  const space = smallSide / density

  const lines = []

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)

    for (let y = startY; y < endY; y += 1) {
      for (let x = startX; x < endX; x += 1) {
        const noise = p5.noise(
          x * multi * multi,
          y * multi - 69
        )
        const color = Math.floor(p5.map(noise, 0, 1, 0, 120))
        vectors.push({
          x,
          y,
          color
        })
      }
    }
    for (let y = startY + 12; y < endY - 12; y += Math.floor(p5.random(100))) {
      if (y !== startY + 12) {
        let dust = []
        for (let x = startX - 1; x < endX - 1; x++) {
          dust.push({
            x,
            y: y + p5.random(-2, 2)
          })
          dust.push({
            x,
            y: y + p5.random(-4, 4)
          })
          dust.push({
            x,
            y: y + p5.random(-8, 8)
          })
          dust.push({
            x,
            y: y + p5.random(-12, 12)
          })
        }
        lines.push({
          y,
          dust
        })
      }
    }
  }

  p5.draw = () => {
    p5.background(0)
    p5.push()
    // p5.strokeWeight(2)
    p5.stroke(200)
    p5.fill(200)
    p5.rect(startX - 1, startY - 1, smallSide + 2, smallSide * 3 / 4 + 2)
    p5.pop()


    vectors.forEach(({ x, y, color }) => {
      p5.set(x, y, color)
    })
    p5.updatePixels()

    lines.forEach(y => {
      p5.stroke(255)
      p5.line(startX - 1, y, endX, y)
      y.dust.forEach(p => p5.point(p.x, p.y))
    })

    p5.push()
    p5.textSize(30)
    p5.strokeWeight(2)
    p5.fill(200)
    p5.stroke(150)
    p5.textFont('monospace')
    p5.text('<< REWIND', startX + 30, startY + 53)
    p5.pop()
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.keyPressed = () => {
    if (p5.key === 'p') {
      console.log('downloading')
      p5.saveCanvas(`VHS-s${seed}`, 'png')
    }
  }
}