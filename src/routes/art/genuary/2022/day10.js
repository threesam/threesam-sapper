import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day10 = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const isSmallestSide = w > h ? h : w
  const maxSize = isSmallestSide * 0.8
  const seed = Math.floor(p5.random(1000000))

  const increment = 10
  const vectors = []
  const start = [-maxSize / 2 + increment, -maxSize / 2 + increment]

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)
    p5.rectMode(p5.CENTER)

    // const vector = p5.createVector(...start)
    // vectors.push(vector)
    // let prev = start[1]
    // for (let x = -maxSize / 2; x < maxSize / 2; x += increment) {
    //   const newVal = p5.random() > 0.75 ? 1 : 2
    //   const newVector = p5.createVector(x, prev + newVal)
    //   vectors.push(newVector)
    // }
    for (let i = 0; i < 500; i++) {
      vectors.push(p5.createVector(
        p5.random(-maxSize / 2 - increment * 2, maxSize / 2 + increment),
        p5.random(-maxSize / 2 - increment * 2, maxSize / 2 + increment)
      ))
    }
    console.log(vectors)
  }

  p5.draw = () => {
    p5.background(getStyle('--background'))
    p5.translate(w / 2, h / 2) // center composition

    p5.stroke(255)
    p5.noFill()
    p5.rect(0, 0, maxSize, maxSize)

    vectors.forEach(vector => {
      p5.push()
      p5.strokeWeight(5)
      if (Math.abs(vector.x) > maxSize / 2 + 1 || Math.abs(vector.y) > maxSize / 2 + 1) {
        p5.stroke(255, 0, 0)
      }
      p5.point(vector.x, vector.y)
      p5.pop()
    })
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.mouseClicked = () => {
    console.log('downloading')
    p5.saveCanvas(`machinelearning-s${seed}`, 'png')
  }
}