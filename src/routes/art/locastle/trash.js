import { getHeaderHeightPixels, getStyle } from '../../../utils/artStuff'
import { format } from 'date-fns'

export default (p5) => {
  p5.disableFriendlyErrors = true

  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const padding = 0.75
  const smallSide = w > h ? h * padding : w * padding

  const seed = Math.floor(p5.random(1000000))
  const multi = 0.005
  const start = -smallSide / 2
  const end = smallSide / 2

  const word = 'kill the perfectionist.'
  const letters = word.split('')

  const density = letters.length + 1
  const space = smallSide / density

  const vectors = []

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)
    p5.noLoop()

    let count = 0

    for (let y = start; y < end; y += space) {
      for (let x = start; x < end; x += space) {
        const average = (x + y) / 2
        const size = p5.map(average, start, end, 7, 20)
        const color = p5.map(average, start, end, 255, 0)
        const rotation = p5.map(average, start, end * 2, 0, p5.random(p5.PI / 4))
        const pad = p5.map(average, start, end, 0, p5.random(-5, 15))
        const offset = p5.map(average, start, end * 2, 0, p5.random(255))
        vectors.push({
          x: x + pad,
          y: y + pad,
          letter: letters[count],
          size,
          color,
          offset,
          rotation
        })

        if (count > letters.length - 1) {
          count = 0
        } else {
          count++
        }
      }
    }
  }

  p5.draw = () => {
    p5.background(0)
    p5.translate(w / 2, h / 2)
    p5.rotate(-p5.PI / 31)

    vectors.forEach(({ x, y, letter, size, color, offset, rotation }) => {
      p5.push()
      p5.translate(x, y)
      p5.rotate(rotation)
      p5.fill(255, color, color, 255 - color - offset)
      p5.textSize(size)
      p5.textFont('monospace')
      p5.text(letter, 0, 0)
      p5.pop()
    })
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }


  p5.keyPressed = () => {
    if (p5.key === 'p') {
      console.log('downloading')
      p5.saveCanvas(`kill-perfect-s${seed}`, 'png')
    }
  }
}