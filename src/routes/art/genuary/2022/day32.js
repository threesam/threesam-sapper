// THANK YOU FOR THE ASSIST 
// https://mary.codes/blog/art/shape_packing_with_p5js/

import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day32 = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const smallerSide = w > h ? h : w
  const seed = Math.floor(p5.random(1000000))

  const multi = 0.69

  let bg
  let kills = 0

  const circles = []

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)
    p5.rectMode(p5.CENTER)
  }

  p5.draw = () => {

    p5.background(0, 10, 0)
    p5.translate(w / 2, h / 2)

    const x = p5.random(-smallerSide / 2, smallerSide / 2)
    const y = p5.random(-smallerSide / 2, smallerSide / 2)
    const initR = 1

    if (p5.dist(0, 0, x, y) < smallerSide / 2.5 && (p5.frameCount > 1000 || p5.frameCount % 7 === 0)) {
      circles.push(new Shape(x, y, initR))
    }
    circles.forEach(s => {
      if (detectEdgeCollision(s)) {
        s.draw()
      } else if (detectShapeCollision(s, circles)) {
        if (s.r > 1) {
          s.draw()
        }
      } else {
        s.grow()
      }
    })

    if (kills > 10000) {
      console.log("stopped")
      p5.saveCanvas(`shellpacking-s${seed}`, 'png')
      p5.noLoop()
    }

    // p5.frameRate(24)
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.keyPressed = () => {
    if (p5.key === 'p') {
      console.log('downloading')
      p5.saveCanvas(`packing-s${seed}`, 'png')
    }
  }

  class Shape {
    constructor(x, y, radius) {
      this.x = x
      this.y = y
      this.r = radius
      this.weight = Math.floor(p5.map(p5.noise(x * multi), 0, 1, 4, 1))
      this.dark = Math.floor(p5.map(p5.noise(x * multi), 0, 1, 0, 30))
      this.small = Math.floor(p5.map(p5.noise(x * multi), 0, 1, 0, 50))
      this.green = 0//Math.floor(p5.map(p5.noise(x * multi), 0, 1, 0, 255))
      this.big = Math.floor(p5.map(p5.noise(x * multi, y * multi), 0, 1, 150, 250))
      this.alpha = Math.floor(p5.map(p5.dist(x, y, w / 2, h / 2), 0, smallerSide / 2 * 0.9, 255, 0))
      this.rotation = p5.map(p5.noise(this.x * multi, this.y * multi), 0, 1, 0, Math.PI)
      this.line = this.r - p5.random(this.r / 10)
    }

    draw() {
      p5.push()
      p5.translate(this.x, this.y)
      p5.rotate(this.rotation)
      for (let i = 0; i < 200; i++) {
        const angle = p5.map(i, 0, 200, 0, p5.PI)
        const offset = p5.map(i, 0, 200, 0, 10)
        p5.rotate(angle)
        p5.stroke(this.big, this.big - this.small, 0)
        p5.line(0, 0, 0, this.r - offset)
      }
      p5.pop()
    }

    grow() {
      this.r++
      this.draw()
    }
  }

  function detectEdgeCollision(shape) {
    if (
      p5.dist(shape.x, shape.y, 0, shape.y) <= shape.r ||
      p5.dist(shape.x, shape.y, w, shape.y) <= shape.r ||
      p5.dist(shape.x, shape.y, shape.x, 0) <= shape.r ||
      p5.dist(shape.x, shape.y, shape.x, h) <= shape.r
    ) {
      return true
    }
    return false
  }

  function detectShapeCollision(shape, array) {
    for (let i = 0; i < array.length; i++) {
      let shape2 = array[i]
      let distance = p5.dist(shape.x, shape.y, shape2.x, shape2.y)
      if (distance !== 0 && distance <= shape.r + shape2.r) {
        if (shape.r === 1) {
          array.pop()
          kills++
        }
        return true
      }
    }
    return false
  }

  function drawFlower(x, y, z, color, petals) {
    p5.push()
    p5.translate(x, y, z)
    for (let i = 0; i < petals; i++) {
      const angle = p5.map(i, 0, petals, 0, p5.TWO_PI)
      p5.rotateZ(angle)
      p5.stroke(0)
      p5.stroke(color)
      p5.line(0, 0, 0, angle + 100)
    }
    p5.pop()
  }
}