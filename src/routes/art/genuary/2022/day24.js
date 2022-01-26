import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'
import { format } from 'date-fns'

export const day24 = (p5) => {
  p5.disableFriendlyErrors = true


  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const padding = 0.69
  const smallSide = w > h ? h * padding : w * padding

  const seed = Math.floor(p5.random(1000000))
  const multi = 0.05

  const start = - smallSide / 2
  const end = smallSide / 2
  const density = 10//27
  const space = smallSide / density

  const maxLength = 25
  const minLength = 7
  const angle = 30

  const vectors = []

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)
    p5.angleMode(p5.DEGREES)
    p5.rectMode(p5.CENTER)

    for (let i = 0; i < 69420; i++) {
      vectors.push({
        x: p5.random(start, end),
        y: p5.random(start, end),
        width: Math.ceil(p5.random(20)),
        height: Math.ceil(p5.random(20)),
        r: Math.ceil(p5.random(255)),
        g: Math.ceil(p5.random(255)),
        b: Math.ceil(p5.random(255)),
        type: Math.ceil(p5.random(2))
      })
    }

    p5.noLoop()
  }

  p5.draw = () => {
    p5.background(0)
    p5.translate(w / 2, h / 2)

    vectors.forEach(({ x, y, width, height, r, g, b, type }) => {
      p5.fill(r, g, b)

      if (type === 1) {
        p5.ellipse(x, y, width, height)
      } else if (type === 2) {
        p5.rect(x, y, width, height)
      }
    })
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }


  p5.keyPressed = () => {
    if (p5.key === 'p') {
      console.log('downloading')
      p5.saveCanvas(`abstractplants-s${seed}`, 'png')
    }
    if (p5.key === 'g') {
      generate()
    }
  }
}