import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day1 = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const isLandscape = w > h

  let objects = []
  const makeCircle = () => {
    const maxRadius = isLandscape ? h / 3 : w / 3
    return {
      coordinates: [p5.random(-maxRadius, maxRadius), p5.random(-maxRadius, maxRadius)],
      diameter: p5.random(13, 69),
      color: [0, 0, p5.random(200, 255)], // shade of blue
      alpha: p5.random(50, 100),
      isDifferent: false
    }
  }

  p5.setup = () => {
    p5.createCanvas(w, h)

    // determine amount of circles based on viewport
    const circleAmount = () => {
      const pixels = isLandscape ? h : w
      return pixels > 500 ? pixels / 2 : pixels / 4
    }

    // create circles
    for (let i = 0; i < circleAmount(); i++) {
      objects.push(makeCircle())
    }

    // make one unique
    objects = objects.map((object, i) => {
      const pad = Math.floor(objects.length / 5)
      if (i === objects.length - pad) {
        object.isDifferent = true
      }
      return object
    })
  }

  p5.draw = () => {
    p5.background(getStyle('--background'))

    p5.translate(w / 2, h / 2) // center composition
    p5.noStroke()

    // render stored circles
    objects.forEach(({ coordinates, diameter, color, alpha, isDifferent }) => {
      if (!isDifferent) {
        p5.fill(...color, alpha)
      } else {
        p5.fill(getStyle('--textColor')) // render the unique circle
      }

      p5.ellipse(...coordinates, diameter)
    })
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }
}