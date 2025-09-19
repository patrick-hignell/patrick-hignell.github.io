// main.js
import { encode } from './encode.js'
import { decode } from './decode.js'

const input = document.getElementById('PlainTextArea')
const output = document.getElementById('CodedText')
const button = document.getElementById('decoderButton')

input.addEventListener('change', (event) => {
  const plaintext = input.value
  const codedText = encode(plaintext)
  output.textContent = codedText
})

button.addEventListener('click', (event) => {
  const plaintext = output.textContent
  const codedText = decode(plaintext)
  output.textContent = codedText
})
