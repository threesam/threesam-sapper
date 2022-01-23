import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'
import { format } from 'date-fns'

export const day22 = (p5) => {
  p5.disableFriendlyErrors = true

  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const padding = 0.69
  const smallSide = w > h ? h * padding : w * padding
  const seed = new Date()//Math.floor(p5.random(1000000))

  const vectors = []
  const lines = []
  const points = []
  const multi = 0.025
  const spacing = smallSide / 60 * 0.4 * 2
  const start = - smallSide * 0.4
  const end = smallSide * 0.4
  const density = 50
  const space = smallSide / density

  p5.setup = () => {
    p5.createCanvas(w, h)
    p5.noiseSeed(seed)
    p5.rectMode(p5.CENTER)

    // min x secs
    for (let x = start; x < end; x += spacing) {
      for (let y = start; y < end; y += spacing) {
        const noise = p5.noise(x * multi, y * multi)
        const color = p5.map(noise, 0, 1, 50, 150)
        vectors.push({ x, y, color })
      }
    }

    // day
    const increment = smallSide / padding / (Math.sqrt(365))
    for (let x = -smallSide / 2 / padding; x < smallSide / 2 / padding - increment; x += increment) {
      for (let y = -smallSide / 2 / padding; y < smallSide / 2 / padding; y += increment) {
        if (Math.random() > 0.5) {
          lines.push([x, y, x + increment, y + increment])
        } else {
          lines.push([x, y + increment, x + increment, y])
        }
      }
    }

    // year
    const year = +format(new Date(), 'yyyy')
    for (let i = 0; i < year; i++) {
      points.push({
        x: p5.random(-smallSide / 2 / padding, smallSide / 2 / padding),
        y: p5.random(-smallSide / 2 / padding, smallSide / 2 / padding)
      })
    }
  }

  p5.draw = () => {
    const offset = p5.frameCount / 13
    p5.background(0)
    p5.translate(w / 2, h / 2)
    // p5.rotate(p5.PI / 4)
    const date = format(new Date(), 'yyyy/MM/dd/HH/mm/ss').split('/')
    const time = {
      year: date[0],
      month: date[1],
      day: date[2],
      hour: date[3],
      minute: date[4],
      second: date[5]
    }

    const increment = smallSide / padding / Math.sqrt(365)
    points.forEach(({ x, y }) => {
      p5.push()
      if (x < -smallSide / 2 || x > smallSide / 2 || y < -smallSide / 2 || y > smallSide / 2) {
        p5.stroke(255, 255, 0)
      } else {
        p5.stroke(125, 125, 0)
      }
      p5.point(x, y)
      p5.pop()
    })
    const yearPad = Math.floor(time.hour * spacing)
    lines
      .slice(0, time.day)
      .forEach(line => {
        p5.push()
        if (line[0] < -smallSide * 0.4 - yearPad || line[0] > smallSide * 0.4 + yearPad || line[1] < -smallSide * 0.4 - yearPad || line[1] > smallSide * 0.4 + yearPad ||
          line[2] < -smallSide * 0.4 - yearPad || line[2] > smallSide * 0.4 + yearPad || line[3] < -smallSide * 0.4 - yearPad || line[3] > smallSide * 0.4 + yearPad) {
          p5.stroke(255)
        } else {
          p5.stroke(50)
        }
        if (Math.random() > 0.5) {
          p5.line(...line)
        } else {
          p5.line(...line)
        }
        p5.pop()
      })
    vectors.forEach(({ x, y, color }) => {
      const secondSpace = p5.map(x, start, end, 1, 60)
      const minuteSpace = p5.map(y, start, end, 60, 1)
      if (time.minute >= minuteSpace) {
        p5.fill(color)
      } else if (time.second >= secondSpace) {
        p5.fill(250)
      } else {
        p5.noFill()
      }
      p5.push()
      p5.rectMode(p5.CORNER)
      p5.rect(x + spacing / 4, y + spacing / 4, spacing / 2)
      p5.pop()
    })
    for (let hour = 0; hour < time.hour; hour++) {
      p5.push()
      const color = p5.map(hour, 0, time.hour, 150, 100)
      const pad = Math.floor(hour * spacing) + spacing * 2
      const newStart = start - spacing - pad
      const newEnd = end + pad

      p5.strokeWeight(2)
      p5.stroke(color, color / 2, 0)
      p5.noFill()
      p5.rect(0, 0, smallSide * 0.8 + pad)


      p5.pop()
    }

    p5.frameRate(1)
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }

  p5.keyPressed = () => {
    if (p5.key === 'p') {
      console.log('downloading')
      p5.saveCanvas(`seaofshapes-s${seed}`, 'png')
    }
  }
}