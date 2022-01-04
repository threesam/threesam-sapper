import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day4 = (p5) => {
  const w = document.body.offsetWidth // viewport w
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const isLandscape = w > h

  var inc = 0.1
  var scl = 10
  var cols, rows

  var zoff = 0

  var fr

  var particles = []

  var flowfield

  p5.setup = () => {
    p5.createCanvas(w, h)

    p5.colorMode(p5.HSB, 255)
    cols = Math.floor(w / scl)
    rows = Math.floor(h / scl)
    fr = p5.createP('')

    flowfield = new Array(cols * rows)

    for (var i = 0; i < 100; i++) {
      particles[i] = new Particle()
    }
  }

  p5.draw = () => {
    var yoff = 0
    for (var y = 0; y < rows; y++) {
      var xoff = 0
      for (var x = 0; x < cols; x++) {
        var index = x + y * cols
        var angle = p5.noise(xoff, yoff, zoff) * p5.TWO_PI * 4
        var v = p5.constructor.Vector.fromAngle(angle)
        v.setMag(1)
        flowfield[index] = v
        xoff += inc
        p5.strokeWeight(10)
        p5.stroke(0, 50)
        // push();
        // translate(x * scl, y * scl);
        // rotate(v.heading());
        // strokeWeight(1);
        // line(0, 0, scl, 0);
        // pop();
      }
      yoff += inc

      zoff += 0.0003
    }

    for (var i = 0; i < particles.length; i++) {
      particles[i].follow(flowfield)
      particles[i].update()
      particles[i].edges()
      particles[i].show()
    }

  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  function Particle() {
    this.pos = p5.createVector(p5.random(w), p5.random(h))
    this.vel = p5.createVector(0, 0)
    this.acc = p5.createVector(0, 0)
    this.maxspeed = 4
    this.h = 0

    this.prevPos = this.pos.copy()

    this.update = function () {
      this.vel.add(this.acc)
      this.vel.limit(this.maxspeed)
      this.pos.add(this.vel)
      this.acc.mult(0)
    }

    this.follow = function (vectors) {
      var x = Math.floor(this.pos.x / scl)
      var y = Math.floor(this.pos.y / scl)
      var index = x + y * cols
      var force = vectors[index]
      this.applyForce(force)
    }

    this.applyForce = function (force) {
      this.acc.add(force)
    }

    this.show = function () {
      p5.stroke(this.h, 255, 255, 25)
      this.h = this.h + 1
      if (this.h > 255) {
        this.h = 0
      }
      p5.strokeWeight(1)
      p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
      this.updatePrev()
    }

    this.updatePrev = function () {
      this.prevPos.x = this.pos.x
      this.prevPos.y = this.pos.y
    }

    this.edges = function () {
      if (this.pos.x > w) {
        this.pos.x = 0
        this.updatePrev()
      }
      if (this.pos.x < 0) {
        this.pos.x = w
        this.updatePrev()
      }
      if (this.pos.y > h) {
        this.pos.y = 0
        this.updatePrev()
      }
      if (this.pos.y < 0) {
        this.pos.y = h
        this.updatePrev()
      }
    }
  }
}