import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day5 = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const isLandscape = w > h
  const seed = Math.floor(p5.random(1000000))

  const vectors = []

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)

    const halfTotal = w > 768 ? 300 : 150
    const increment = 25
    const multi = 0.1

    for (let x = -halfTotal; x < halfTotal; x += increment) {
      for (let y = -halfTotal; y < halfTotal; y += increment) {
        const pad = p5.map(p5.noise(x * multi, y * multi), 0, 1, 0, 19)
        const scaledX = p5.map(x, 0, halfTotal, 1, 1.1)
        const scaledY = p5.map(y, 0, -halfTotal, 1, 1.1)
        const average = (scaledX + scaledY) / 2
        const multiplier = p5.random(1, 4)

        let vector// = [x, y]
        if (x >= halfTotal - increment * multiplier && y <= increment * multiplier - halfTotal) {
          vector = [x * average + p5.random(-2, 2 * average), y * average + p5.random(-2, 2 * average)]
        } else {
          vector = [x, y]
        }


        const size = p5.map(p5.noise(x * multi, y * multi), 0, 1, 0, increment)
        vectors.push({ vector, size, increment, halfTotal, pad })
      }
    }

    p5.shuffle(vectors, true)
  }

  p5.draw = () => {
    p5.background(getStyle('--background'))
    p5.translate(w / 2, h / 2) // center composition

    vectors
      .forEach(({ vector, size, increment, halfTotal, pad }, index) => {
        const [x, y] = vector

        // color
        const r = p5.map(x, 0, w, 100, 200)
        const g = p5.map(y, 0, h, 10, 100)
        const b = p5.map(y, 0, w, 50, 10)


        const scaledX = p5.map(x, 0, halfTotal * 1.3, 255, 0)
        const scaledY = p5.map(y, 0, -halfTotal * 1.3, 255, 0)
        p5.fill(255, Math.floor(scaledY + scaledX / 2))



        p5.rect(x, y, increment - size, increment - size)

      })
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.mouseClicked = () => {
    console.log('downloading')
    p5.saveCanvas(`square-s${seed}`, 'png')
  }
}