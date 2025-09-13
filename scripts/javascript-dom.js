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
  let error = false
  let newText
  let isQuotation = false
  let quotationMarker = ''
  let quotationText = ''
  let textArray = elementArray[i].innerHTML.split(/([ ,;:.\[\]\(\)\"\'\{\}])/)
  let newChild
  elementArray[i].innerHTML = ''
  console.log(textArray)
  for (let j = 0; j < textArray.length; j++) {
    if (textArray[j] != '') {
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
          textArray[j].includes(':')
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
          console.log(bracketCount)
          addNewSpan(
            elementArray[i],
            'bracket-' + bracketCount.toString(),
            textArray[j]
          )
          bracketCount++
          console.log(bracketCount)
        } else if (
          textArray[j].includes('}') ||
          textArray[j].includes(']') ||
          textArray[j].includes(')')
        ) {
          bracketCount--
          if (bracketCount < 1) {
            bracketCount = 3
          }
          console.log(bracketCount)
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

// test stuff //
const minion = {
  name: 'Jeff',
  age: 33,
  mainTask: 'nose picker',
}

let amIAConjurerOfCheapTricks = false
if (amIAConjurerOfCheapTricks == false) {
  console.log('I am not trying to rob you, I am trying to help you')
} else {
  Console.log('I am not trying to help you, I am trying to rob you')
}
let stubbornness = 5
switch (stubbornness) {
  case 5:
    console.log('you shall not pass!')
    break
  case 4:
    console.log('you might not pass!')
    break
  case 3:
    console.log("pass or not pass, I don't care!")
    break
  case 2:
    console.log('you could pass if you wanted to!')
    break
  case 1:
    console.log('I would really love it if you would pass!')
    break
  default:
    console.log("I don't know how I feel about you passing!")
    break
}

let psychicLinkDuration = 20
for (let i = 0; i < psychicLinkDuration; i++) {
  console.log('Hold the door!')
}

//const name = "Nigel the Magnificent"
//
//let age = 111
//
//
//const magicTricks = ["one card monte", "52 card pick up", "dude wheres my car?", "pulling a hat out of a rabbit", "I'll do this with my hands"]
//magicTricks[3] = "something less horrifying for the children"
//magicTricks.push("cutting a pigeon in half with a stick")
//let favouriteTrick = magicTricks[0] //favouriteTrick is now "one card monte"
