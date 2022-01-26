import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day25 = (p5) => {
  p5.disableFriendlyErrors = true

  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const padding = 0.75
  const smallSide = w > h ? h * padding : w * padding
  const seed = Math.floor(p5.random(1000000))

  const vectors = []
  const multi = 0.025
  const start = - smallSide * 4.5
  const end = smallSide * 4.5
  const density = 13
  const space = smallSide / density

  p5.setup = () => {
    p5.createCanvas(w, h, p5.WEBGL)
    p5.noiseSeed(seed)
    // p5.rectMode(p5.CENTER)
    p5.noLoop()
  }

  p5.draw = () => {
    const offset = p5.frameCount / 13
    p5.background(0)
    p5.rotateX(-p5.PI / 5)
    p5.rotateY(p5.PI / 7)
    p5.rotateZ(p5.PI / 30)
    p5.stroke(255, 0, 0)
    p5.noFill()


    p5.translate(w, h / 3, 0)
    for (let y = start; y < end; y += space) {
      // p5.beginShape(p5.TRIANGLE_STRIP)
      for (let x = start; x < end; x += space) {
        const size = p5.map(y, start, end, 13, 30)
        const move = p5.map(y, start, end, -size / 3, size / 3)
        const noise = p5.map(p5.noise(x * multi, y * multi), 0, 1, -3, 3)
        const curve = p5.map(p5.noise(x * multi, y * multi), 0, 1, -10, 10)
        // const curve = p5.map(p5.cos(x), 0, 1, 100, 100)

        p5.noStroke()
        p5.fill(255, 250, 200)
        p5.push()
        p5.translate(0, 0, curve)
        p5.circle(x + noise, y + noise, size + noise * 2)
        p5.pop()
        p5.push()
        p5.fill(0)
        p5.translate(0, 0, curve)

        p5.circle(x + noise + move, y + noise - move, size / 3 - noise)
        // p5.stroke(0, 255, 0)
        // p5.point(x, y, 0)
        // p5.point(x, y + space, 0)
        p5.pop()
      }
      p5.endShape()
    }
    // if (p5.frameCount < p5.TWO_PI * 13) {
    // p5.frameRate(5)
    //   p5.saveCanvas(`img${p5.frameCount.toString().padStart(4, '0')}`, 'png')
    // } else {
    p5.noLoop()
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