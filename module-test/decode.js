// decode.js
export function decode(plaintext) {
  let codedText = ''
  for (let i = 0; i < plaintext.length; i++) {
    let cc = plaintext.charCodeAt(i) - 9 // they'll definitely figure this out
    codedText += String.fromCharCode(cc)
  }
  return codedText
}
