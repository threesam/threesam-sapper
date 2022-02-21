import { getHeaderHeightPixels, getStyle } from '../../../utils/artStuff'
import { format } from 'date-fns'

export default (p5) => {
  p5.disableFriendlyErrors = true

  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const padding = 1
  const smallSide = w > h ? h * padding : w * padding

  const seed = Math.floor(p5.random(1000000))
  const multi = 0.05
  const r = 40
  const start = -smallSide / 2
  const end = smallSide / 2
  const density = 10//27
  const space = smallSide / density

  const maxLength = smallSide / 9
  const minLength = 3
  const angle = 30

  const vectors = []

  p5.setup = () => {
    p5.createCanvas(w, h, p5.WEBGL)
    p5.noiseSeed(seed)
    p5.ortho()

    for (let i = 0; i < 100; i++) {
      vectors.push({
        x: p5.random(start, end),
        y: p5.random(start, end),
        z: p5.random(start, end),
        r: p5.random(10, 20),
        h: p5.random(30, 40)
      })
    }
  }

  p5.draw = () => {
    p5.background(0)
    p5.rotateX(-p5.PI / 8)

    vectors.forEach(({ x, y, z, r, h }) => {
      drawCan(x, y, z, r, h)
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

  function drawCan(x, y, z, r, h) {
    p5.push()
    p5.translate(x, y, z)
    p5.fill(150)
    p5.stroke(150)
    p5.cylinder(r, h)
    p5.translate(0, -h / 2, 0)
    p5.fill(120)
    p5.stroke(120)
    p5.cylinder(r * 1.1, h * 0.069)
    p5.pop()
  }
}