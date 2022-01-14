// THANK YOU FOR THE ASSIST 
// https://mary.codes/blog/art/shape_packing_with_p5js/

import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day12 = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const smallerSide = w > h ? h : w
  const seed = Math.floor(p5.random(1000000))

  let bg
  let kills = 0

  const circles = []

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)
    p5.rectMode(p5.CENTER)
  }

  p5.draw = () => {

    p5.background(getStyle('--background'))

    const x = p5.random(0, w)
    const y = p5.random(0, h)
    const initR = 1

    circles.push(new Shape(x, y, initR))
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
      noLoop()
    }

    // p5.frameRate(24)
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.mouseClicked = () => {
    console.log('downloading')
    p5.saveCanvas(`packing-s${seed}`, 'png')
  }

  class Shape {
    constructor(x, y, radius) {
      this.x = x
      this.y = y
      this.r = radius
      this.weight = Math.floor(p5.map(p5.noise(x * 0.0069), 0, 1, 4, 1))
      this.red = Math.floor(p5.map(p5.noise(x * 0.0069), 0, 1, 0, 200))
      this.green = 0//Math.floor(p5.map(p5.noise(x * 0.0069), 0, 1, 0, 255))
      this.blue = Math.floor(p5.map(p5.noise(y * 0.0069), 0, 1, 0, 255))
      this.alpha = Math.floor(p5.map(p5.dist(x, y, w / 2, h / 2), 0, smallerSide / 2 * 0.9, 255, 0))
    }

    draw() {
      p5.stroke(this.red, this.green, this.blue, this.alpha)
      p5.strokeWeight(this.weight)
      p5.noFill()
      p5.circle(this.x, this.y, this.r * 2 - this.weight)
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
}