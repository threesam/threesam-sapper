import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day26 = (p5) => {
  p5.disableFriendlyErrors = true

  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const padding = 0.75
  const smallSide = w > h ? h * padding : w * padding
  const seed = Math.floor(p5.random(1000000))

  const vectors = []
  const multi = 0.0005
  const start = - smallSide * 0.5
  const end = smallSide * 0.5
  const density = 50
  const space = smallSide / density

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)
    // p5.rectMode(p5.CENTER)

    for (let y = start; y < end; y += space * 2) {
      for (let x = start; x < end; x += space) {
        const sin = p5.map(p5.sin(y), -1, 1, -10, 10)
        const cos = p5.map(p5.cos(x), -1, 1, -10, 10)

        if (p5.dist(p5.random(start, end), p5.random(start, end), 0, 0) < 200) {
          vectors.push({ x, y: y + (p5.sin(x * 13) * 20) })
        } else {
          vectors.push({ x, y: y + (p5.sin(x * 13) * 10) })
        }
      }
    }
  }

  p5.draw = () => {
    p5.noLoop()
    const offset = p5.frameCount / 13
    p5.background(0)
    p5.translate(w / 2, h / 2)
    // p5.rotate(p5.PI / 4)
    p5.noFill()
    p5.stroke(255)

    // for (let y = start; y < end; y += space) {
    //   p5.push()
    //   const randomPlane = p5.random(start, end)
    //   p5.beginShape()
    //   for (let x = start; x < end; x += space) {
    //     const sinX = p5.map(p5.sin(y), -1, 1, -10, 10)
    //     // const sinY = p5.map(, -1, 1, -10, 10)
    //     const color = p5.map(y, start, end, 0, 200)
    //     p5.stroke(0, 100, color, color + 69)

    //     if (p5.dist(p5.random(start, end), p5.random(start, end), 0, 0) < 200) {
    //       p5.vertex(x, y + (p5.sin(x * 13) * 20))
    //     } else {
    //       p5.vertex(x, y + (p5.sin(x * 13) * 10))
    //     }

    //     // if (p5.dist(randomPlane, y, x, y) < space * 0.5) {
    //     //   // draw plane
    //     //   const noise = p5.noise(x * multi, y * multi)
    //     //   let rot
    //     //   if (p5.dist(p5.random(start, end), p5.random(start, end), 0, 0) < 250) {
    //     //     rot = (p5.sin(x * 13) * 20)
    //     //   } else {
    //     //     rot = (p5.sin(x * 13) * 10)
    //     //   }
    //     //   const rotation = p5.map(rot, -1, 1, -p5.PI / 8, p5.PI / 8)

    //     //   p5.push()
    //     //   // p5.rotate(rotation)
    //     //   p5.stroke(0, 100, 50, color / 2)
    //     //   p5.line(x, y, x + 30, y)
    //     //   p5.line(x + 15, y, x + 10, y + 10)
    //     //   p5.line(x + 15, y, x + 10, y - 10)
    //     //   p5.line(x, y, x - 1, y + 2)
    //     //   p5.line(x, y, x - 1, y - 2)
    //     //   p5.pop()
    //     // }

    //   }
    //   p5.endShape()
    //   p5.pop()
    // }

    for (let plane = 0; plane < 13000; plane++) {
      const bounds = 2
      let x = p5.random(start * bounds, end * bounds)
      let y = p5.random(start * bounds, end * bounds)


      const noise = p5.noise(x * multi, y * multi)
      const color = p5.map(noise, 0, 1, 100, 250)


      const isSquare = x < start || x > end || y > end || y < start
      const isCircle = true //p5.dist(x, y, 0, 0) > end - 30

      if (isCircle) {
        p5.push()
        p5.translate(0, 0)
        const rotation = p5.map(noise, 0, 1, 0, p5.TWO_PI)
        p5.rotate(rotation)
        p5.stroke(p5.random(255))
        p5.line(x, y, x + 30, y)
        p5.line(x + 15, y, x + 10, y + 10)
        p5.line(x + 15, y, x + 10, y - 10)
        p5.line(x, y, x - 1, y + 2)
        p5.line(x, y, x - 1, y - 2)
        p5.pop()
      }

    }

    if (p5.frameCount < p5.TWO_PI * 13) {
      p5.frameRate(5)
      // p5.saveCanvas(`img${p5.frameCount.toString().padStart(4, '0')}`, 'png')
    } else {
      p5.noLoop()
    }
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