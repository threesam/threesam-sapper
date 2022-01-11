import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day9 = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const isLandscape = w > h
  const seed = Math.floor(p5.random(1000000))

  const slabHeight = 20

  p5.setup = () => {
    p5.createCanvas(w, h, p5.WEBGL)
    p5.noiseSeed(seed)
    p5.angleMode(p5.DEGREES)
  }

  p5.draw = () => {
    p5.background(getStyle('--background'))

    p5.rotateX(-10)
    p5.rotateY(10)
    p5.fill(getStyle('--background'))
    p5.stroke(getStyle('--textColor'))

    // stacked cylinders
    p5.push()
    for (let x = 0; x < 5; x++) {
      p5.cylinder(100, slabHeight)
      p5.translate(0, -slabHeight, 0)
    }
    p5.pop()

    // sphere top
    p5.push()
    p5.translate(0, 10 - 4 * slabHeight, 0)
    p5.sphere(99)
    p5.pop()


    // door
    p5.push()
    p5.translate(0, 20, 100)
    //left door slabs
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 4; y++) {
        p5.push()
        p5.translate(-30, -slabHeight - slabHeight * x, 0 + slabHeight * y)
        p5.box(slabHeight, slabHeight, slabHeight)
        p5.pop()
      }
    }
    //right door slabs
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 4; y++) {
        p5.push()
        p5.translate(30, -slabHeight - slabHeight * x, 0 + slabHeight * y)
        p5.box(slabHeight, slabHeight, slabHeight)
        p5.pop()
      }
    }

    // door topper
    p5.translate(0, -70, 28)
    p5.rotateX(90)
    p5.cylinder(40, 80)

    // door's negative space
    p5.translate(0, 41, 0)
    p5.rotateX(90)
    p5.circle(0, 0, 40)
    p5.noStroke()
    p5.rectMode(p5.CENTER)
    p5.translate(0, -30, -1)
    p5.rect(0, 0, 40, 60)
    p5.pop()
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h, p5.WEBGL)
  }

  p5.mouseClicked = () => {
    console.log('downloading')
    p5.saveCanvas(`architecture-s${seed}`, 'png')
  }
}