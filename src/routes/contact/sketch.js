// import { random } from 'canvas-sketch-util'
// import palettes from 'nice-color-palettes'
// import hexRgb from 'hex-rgb'
// export const palette = random.pick(palettes)

// // pick color from palette and convert to rgba object
// export const color = hexRgb(random.pick(palette))
// const { red, green, blue, alpha } = color



// const pickRandomPaletteColor = (palette) => {
//     const col = random.pick(palette)
//     const rgbCol = hexRgb(col)
//     return rgbCol
// }



function convertRemToPixels(rem) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

const sketch = (p5) => {
    // pull int out of string 
    const headerRem = getComputedStyle(document.body).getPropertyValue('--headerHeight')[1]

    const particles = []

    p5.setup = () => {
        p5.createCanvas(document.body.offsetWidth, p5.windowHeight - convertRemToPixels(headerRem))

        const particlesL = 30
        for (let i = 0; i < particlesL; i++) {
            particles.push(new Particle())
        }
    }

    p5.draw = () => {
        //
        //map background to dark abyss
        //
        p5.background(0)
        particles.forEach((p, index) => {
            //slice and start checking from index
            p.update()
            p.render()
            p.edges()
            p.checkNeighborDist(particles.slice(index))
        })
    }

    p5.windowResized = () => {
        p5.resizeCanvas(document.body.offsetWidth, p5.windowHeight)
    }


    class Particle {
        constructor() {
            this.pos = p5.createVector(p5.random(p5.width), p5.random(p5.height))
            this.vel = p5.createVector(p5.random(-0.5, 0.5), p5.random(-0.5, 0.5))
        }

        update() {
            this.pos.add(this.vel)
        }

        render() {
            p5.noStroke()
            p5.point(this.pos.x, this.pos.y)
        }

        edges() {
            //bounce particle on x edge
            if (this.pos.x < 0 || this.pos.x > p5.width) {
                this.vel.x *= -1
            }
            //bounce particle on y edge
            if (this.pos.y < 0 || this.pos.y > p5.height) {
                this.vel.y *= -1
            }
        }

        checkNeighborDist(particles) {
            particles.forEach(particle => {
                const d = p5.dist(
                    this.pos.x,
                    this.pos.y,
                    particle.pos.x,
                    particle.pos.y,
                )

                //determine orientation and apply responsive length
                let tripLength
                if (p5.windowWidth > p5.windowHeight) {
                    tripLength = p5.windowWidth / 5
                } else {
                    tripLength = p5.windowHeight / 5
                }

                // const { red, green, blue, alpha } = pickRandomPaletteColor(palette)
                if (d <= tripLength) {
                    //map distance to line color
                    const maxA = 255
                    const mapA = p5.map(d, tripLength, 0, 0, maxA)
                    //
                    //if below threshold, glow in the dark
                    //
                    p5.stroke(100, mapA)
                    p5.strokeWeight(2)
                    p5.line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y)
                }
            })
        }
    }
}

export default sketch