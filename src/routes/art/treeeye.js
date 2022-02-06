import { getHeaderHeightPixels, getStyle } from '../../utils/artStuff'
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
  const start = -r
  const end = r
  const density = 10//27
  const space = smallSide / density

  const maxLength = smallSide / 9
  const minLength = 5
  const angle = 30

  const vectors = []

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)
    p5.angleMode(p5.DEGREES)
    p5.rectMode(p5.CENTER)
    p5.noLoop()

    for (let x = start; x < end; x++) {
      for (let y = start; y < end; y++) {
        const off = 20
        const noise = p5.noise(x * multi + off, y * multi - off)
        const color = p5.map(noise, 0, 1, 100, 255)
        const offset = p5.random(-maxLength / 4, maxLength / 4)
        if (p5.dist(x, y, 0, 0) < end) {
          vectors.push({ x, y, color, offset })
        }
      }
    }
  }

  p5.draw = () => {
    p5.background(250)
    p5.translate(w / 2, h / 2)
    // trees.forEach(({ x, y, color }) => {
    //   const dist = p5.dist(x, y, 0, 0)
    //   const offset = p5.map(dist, 0, smallSide * 0.28, 1, 0.25)
    //   p5.push()
    //   p5.stroke(color)
    //   p5.translate(x, y)
    //   branch(maxLength * offset)
    //   p5.pop()
    // })
    // p5.rotate(90)
    // p5.stroke(0)
    //outer
    // p5.push()
    // branch(maxLength)
    // p5.rotate(120)
    // branch(maxLength)
    // p5.rotate(120)
    // branch(maxLength)
    // p5.pop()
    //inner
    // p5.push()
    // drawRow(60, 1.9)

    const rot = 1

    for (let i = 0; i < 120; i += rot) {
      p5.push()
      const map = p5.map(i, 0, 120, 1, 10)
      const color = p5.map(i, 0, 120, 250, 0)
      drawRow(i, map, color)
      p5.pop()
    }

    // drawRow(0, 1)
    // drawRow(30, 1.2)
    // drawRow(30, 1.5)
    // drawRow(30, 2.5)
    // drawRow(30, 4)




    // vectors.forEach(({ x, y, color }) => {
    //   p5.push()
    //   p5.stroke(color)
    //   p5.point(x, y)
    //   p5.pop()
    // })
    // p5.noFill()
    // p5.stroke(200)
    // p5.strokeWeight(2)
    // p5.circle(0, 0, end * 2)
    // let spacer = 120
    // for (let i = 0; i < 360; i += spacer) {
    //   const offset = p5.map(i, 0, 360, 0.5, 1)
    //   p5.rotate(i)
    //   branch(maxLength * offset)
    // }
  }

  function drawRow(rotation, multiplier, color) {
    p5.push()
    // p5.stroke(color)
    p5.stroke(0)
    p5.fill(color)
    p5.rotate(rotation)
    branch(maxLength / multiplier, color)
    p5.rotate(72)
    branch(maxLength / multiplier, color)
    p5.rotate(72)
    branch(maxLength / multiplier, color)
    p5.rotate(72)
    branch(maxLength / multiplier, color)
    p5.rotate(72)
    branch(maxLength / multiplier, color)
    p5.pop()
  }

  function branch(len, color) {
    p5.push()
    let isDone
    if (len > minLength) {
      const weight = p5.map(len, minLength, maxLength, 1, 4)
      // p5.strokeWeight(weight)
      const offset = p5.random(-5, 5)
      // p5.rect(0, 0, offset, -len)
      // p5.noStroke()
      p5.line(0, 0, offset, -len)
      p5.translate(offset, -len)
      p5.rotate(angle)
      branch(len * p5.random(0.6, 0.85))
      p5.rotate(angle * -2)
      branch(len * p5.random(0.6, 0.85))
    } else if (!isDone) {
      p5.stroke(0)
      // p5.fill(p5.random(200, 255))
      // p5.rect(0, 0, 10, len)
      // p5.rect(0, 0, 10 + p5.random(-5, 5), len)
      p5.ellipse(0, 0, p5.random(3, len), p5.random(3, len))

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