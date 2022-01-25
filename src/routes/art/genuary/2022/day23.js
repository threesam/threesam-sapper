import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'
import { format } from 'date-fns'

export const day23 = (p5) => {
  p5.disableFriendlyErrors = true

  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const padding = 1
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

  const trees = []

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)
    p5.angleMode(p5.DEGREES)
    p5.rectMode(p5.CENTER)
    p5.noLoop()

    for (let x = start + space; x < end; x += space) {
      for (let y = start + space; y < end; y += space) {
        const noise = p5.noise(x * multi, y * multi)
        const color = p5.map(noise, 0, 1, 100, 255)
        const offset = p5.random(-maxLength / 4, maxLength / 4)
        if (p5.dist(x, y, 0, 0) < smallSide * 0.28) {
          trees.push({ x: x + p5.random(-10, 10), y: y + p5.random(-10, 10), color, offset })
        }
      }
    }
  }

  p5.draw = () => {
    p5.background(0)
    p5.translate(w / 2, h / 2 + maxLength)
    trees.forEach(({ x, y, color }) => {
      const dist = p5.dist(x, y, 0, 0)
      const offset = p5.map(dist, 0, smallSide * 0.28, 1, 0.25)
      p5.push()
      p5.stroke(color)
      p5.translate(x, y)
      branch(maxLength * offset)
      p5.pop()
    })

    p5.stroke(255)
    // branch(150)
  }

  function branch(len) {
    p5.push()
    let isDone
    if (len > minLength) {
      const weight = p5.map(len, minLength, maxLength, 1, 5)
      // p5.strokeWeight(weight)
      const offset = p5.random(-5, 5)
      // p5.rect(0, 0, offset, -len)
      p5.line(0, 0, offset, -len)
      p5.translate(offset, -len)
      p5.rotate(angle)
      branch(len * p5.random(0.69, 0.8))
      p5.rotate(angle * -2)
      branch(len * p5.random(0.69, 0.8))
    } else if (!isDone) {
      p5.fill(0, 13)
      // p5.rect(0, 0, 10, len)
      p5.ellipse(0, 0, 10 + p5.random(-5, 5), len)

      isDone = true
    }
    p5.pop()
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