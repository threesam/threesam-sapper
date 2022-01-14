const fs = require('fs')

const path = './src/routes/art/genuary/2022/'
const data = fs.readFileSync(path + 'template.js')
const yesterday = +fs.readdirSync(path).filter(file => file.includes('day')).pop().split('.')[0].substr(3)
const today = `day${yesterday + 1}.js`

const index = fs.readFileSync(path + 'index.js', "utf-8")
console.log('index', index)

// fs.writeFileSync(path + today, data)
let inputs = []
let outputs = []
for (let i = 0; i < yesterday; i++) {
  inputs.push(`import {day${i + 1}} from "./day${i + 1}.js"\n`)
}
for (let i = 0; i < yesterday; i++) {
  outputs.push(`day${i + 1},`)
}
// const content = `${inputs.forEach(input => `${input}`)}`

console.log('inputs', inputs)
