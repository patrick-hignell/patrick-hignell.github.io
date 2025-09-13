const functionArray = [
  'getElementsByClassName',
  'split',
  'includes',
  'push',
  'log',
]

const elementArray = document.getElementsByClassName('highlight')

let bracketCount = 1

for (let i = 0; i < elementArray.length; i++) {
  let isQuotation = false
  let isComment = false
  let quotationMarker = ''
  let quotationText = ''
  let commentText = ''
  let rawText = elementArray[i].innerHTML.trim()
  rawText = replaceLtGt(rawText)
  rawText = RemoveNonSpaceWhitespace(rawText)
  let textArray = rawText.split(/([ ,;:.+-/*<>\[\]\(\)\"\'\{\}])/)
  elementArray[i].innerHTML = ''
  console.log(textArray)
  for (let j = 0; j < textArray.length; j++) {
    if (isComment == false) {
      if (isQuotation == false) {
        if (textArray[j].includes('"') || textArray[j].includes("'")) {
          isQuotation = true
          quotationText = textArray[j]
          quotationMarker = textArray[j]
        } else if (isNumeric(textArray[j]) == true) {
          addNewSpan(elementArray[i], 'number', textArray[j])
        } else if (
          textArray[j].includes('.') ||
          textArray[j].includes(',') ||
          textArray[j].includes('=') ||
          textArray[j].includes(':') ||
          textArray[j].includes(';') ||
          textArray[j].includes('+') ||
          textArray[j].includes('-') ||
          textArray[j].includes('/') ||
          textArray[j].includes('*') ||
          textArray[j].includes('<') ||
          textArray[j].includes('>')
        ) {
          addNewSpan(elementArray[i], 'punctuation', textArray[j])
        } else if (
          textArray[j].includes('{') ||
          textArray[j].includes('[') ||
          textArray[j].includes('(')
        ) {
          if (bracketCount > 3) {
            bracketCount = 1
          }
          addNewSpan(
            elementArray[i],
            'bracket-' + bracketCount.toString(),
            textArray[j]
          )
          bracketCount++
        } else if (
          textArray[j].includes('}') ||
          textArray[j].includes(']') ||
          textArray[j].includes(')')
        ) {
          bracketCount--
          if (bracketCount < 1) {
            bracketCount = 3
          }
          addNewSpan(
            elementArray[i],
            'bracket-' + bracketCount.toString(),
            textArray[j]
          )
        } else if (
          textArray[j] == 'let' ||
          textArray[j] == 'const' ||
          textArray[j] == 'true' ||
          textArray[j] == 'false'
        ) {
          addNewSpan(elementArray[i], 'keyword', textArray[j])
        } else if (
          textArray[j] == 'if' ||
          textArray[j] == 'else' ||
          textArray[j] == 'for' ||
          textArray[j] == 'switch' ||
          textArray[j] == 'case' ||
          textArray[j] == 'default' ||
          textArray[j] == 'break'
        ) {
          addNewSpan(elementArray[i], 'statement', textArray[j])
        } else if (functionArray.includes(textArray[j])) {
          addNewSpan(elementArray[i], 'function', textArray[j])
        } else {
          addNewSpan(elementArray[i], 'variable', textArray[j])
        }
      } else {
        if (textArray[j].includes('"') || textArray[j].includes("'")) {
          if (quotationMarker === textArray[j]) {
            isQuotation = false
            quotationText += textArray[j]
            addNewSpan(elementArray[i], 'string', quotationText)
          } else {
            quotationText += textArray[j]
          }
        } else {
          quotationText += textArray[j]
        }
      }
    } else {
    }
  }
}

function addNewSpan(fParent, fClass, fText) {
  let fChild = document.createElement('span')
  fParent.appendChild(fChild)
  if (fClass !== false) {
    fChild.classList.add(fClass)
  }
  fChild.innerHTML = fText
}

function isNumeric(str) {
  if (typeof str != 'string') return false // we only process strings!
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ) // ...and ensure strings of whitespace fail
}

function replaceLtGt(fText) {
  fText = fText.replaceAll('&gt;', '<')
  fText = fText.replaceAll('&lt;', '>')
  return fText
}

//function isNonSpaceWhitespace(fText) {
//  if (/\s/.test(fText) === true && fText !== ' ') {
//    return true
//  } else {
//    return false
//  }
//}

function RemoveNonSpaceWhitespace(ftext) {
  ftext = ftext.replaceAll(' ', '$pacejam')
  ftext = ftext.replaceAll(/\s/g, '')
  ftext = ftext.replaceAll('$pacejam', ' ')
  return ftext
}
// test stuff //

const magicTricks = [
  'one card monte',
  '52 card pick up',
  'dude wheres my car?',
  'pulling a hat out of a rabbit',
  "I'll do this with my hands",
]

magicTricks[3] = 'something less horrifying for the children'

magicTricks.push('cutting a pigeon in half with a stick')

//const name = "Nigel the Magnificent"
//
//let age = 111
//
//
//const magicTricks = ["one card monte", "52 card pick up", "dude wheres my car?", "pulling a hat out of a rabbit", "I'll do this with my hands"]
//magicTricks[3] = "something less horrifying for the children"
//magicTricks.push("cutting a pigeon in half with a stick")
//let favouriteTrick = magicTricks[0] //favouriteTrick is now "one card monte"
