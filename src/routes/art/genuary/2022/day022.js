import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day022 = (p5) => {
  p5.disableFriendlyErrors = true

  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const padding = 1//0.75
  const smallSide = w > h ? h * padding : w * padding
  const seed = Math.floor(p5.random(1000000))

  const vectors = []
  const multi = 0.025
  const start = - smallSide * 0.4
  const end = smallSide * 0.4
  const density = 50
  const space = smallSide / density

  p5.setup = () => {
    p5.createCanvas(w, h, p5.WEBGL)
    p5.noiseSeed(seed)
    p5.rectMode(p5.CENTER)
  }

  p5.draw = () => {
    const offset = p5.frameCount / 13
    p5.background(0)
    p5.rotateX(p5.PI / 3)
    p5.stroke(255, 0, 0)
    p5.noFill()


    p5.translate(0, h / 4)
    for (let y = start; y < end; y += space) {
      p5.beginShape(p5.TRIANGLE_STRIP)
      for (let x = start; x < end; x += space) {
        const noise = p5.map(p5.noise(x * multi, y * multi), 0, 1, -space / 2, space / 2)
        p5.vertex(x, y)
        p5.vertex(x, y + space, 0 + noise)
      }
      p5.endShape()
    }
    // if (p5.frameCount < p5.TWO_PI * 13) {
    // p5.frameRate(5)
    //   p5.saveCanvas(`img${p5.frameCount.toString().padStart(4, '0')}`, 'png')
    // } else {
    //   p5.noLoop()
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