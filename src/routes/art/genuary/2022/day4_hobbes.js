import { getHeaderHeightPixels, getStyle } from '../../../../utils/artStuff'

export const day4 = (p5) => {
  const w = document.body.offsetWidth // viewport width
  const h = p5.windowHeight - getHeaderHeightPixels() // viewport height
  const isLandscape = w > h

  const vectors = []

  let grid

  const scale = 10

  p5.setup = () => {
    p5.createCanvas(w, h)

    const left_x = w * -0.5
    const right_x = w * 1.5
    const top_y = h * -0.5
    const bottom_y = h * 1.5
    const resolution = w * 0.01
    const num_columns = Math.floor((right_x - left_x) / resolution)
    const num_rows = Math.floor((bottom_y - top_y) / resolution)
    grid = Array(num_columns).fill().map(() => Array(num_rows))
    const default_angle = Math.PI * 0.25
    for (let col = 0; col < num_columns; col++) {
      for (let row = 0; row < num_rows; row++) {
        let angle = (row / num_rows) * Math.PI
        grid[col][row] = angle
      }
    }
    console.log('grid', grid)
  }

  p5.draw = () => {
    p5.background(getStyle('--background'))

    p5.stroke(255)
    p5.noFill()

    grid.forEach((_, column) => col.forEach((angle, row) => {
      const vector = p5.createVector(i * scale, j * scale)

    }))
  }

  p5.windowResized = () => {
    p5.resizeCanvas(w, h)
  }
}