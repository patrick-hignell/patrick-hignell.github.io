//const functionArray = [
//  'getElementsByClassName',
//  'split',
//  'includes',
//  'push',
//  'log',
//  'checkSpell',
//]
//
//const elementArray = document.getElementsByClassName('highlight')
//
//let bracketCount = 1
//let isComment = false
//let commentMarker = ''
//for (let i = 0; i < elementArray.length; i++) {
//  let isQuotation = false
//  if (commentMarker !== '/*') {
//    isComment = false
//    commentMarker = ''
//  }
//  let quotationMarker = ''
//  let quotationText = ''
//  let commentText = ''
//  let rawText = elementArray[i].innerHTML.trim()
//  rawText = replaceLtGt(rawText)
//  rawText = RemoveNonSpaceWhitespace(rawText)
//  rawText = AddIndent(elementArray[i], rawText)
//  let textArray = rawText.split(/([ ,;:.+-/*<>\[\]\(\)\"\'\{\}])/)
//  textArray = RemoveNaNFromArray(textArray)
//  elementArray[i].innerHTML = ''
//  //console.log(textArray)
//  for (let j = 0; j < textArray.length; j++) {
//    if (isComment == false) {
//      if (isQuotation == false) {
//        if (textArray[j].includes('/')) {
//          if (textArray[j + 1].includes('/')) {
//            //console.log('//')
//            isComment = true
//            commentMarker = '//'
//            commentText = textArray[j]
//          } else if (textArray[j + 1].includes('*')) {
//            isComment = true
//            commentMarker = '/*'
//            commentText = textArray[j]
//          } else {
//            addNewSpan(elementArray[i], 'punctuation', textArray[j])
//          }
//        } else if (textArray[j].includes('*')) {
//        } else if (textArray[j].includes('"') || textArray[j].includes("'")) {
//          isQuotation = true
//          quotationText = textArray[j]
//          quotationMarker = textArray[j]
//        } else if (isNumeric(textArray[j]) == true) {
//          addNewSpan(elementArray[i], 'number', textArray[j])
//        } else if (
//          textArray[j].includes('.') ||
//          textArray[j].includes(',') ||
//          textArray[j].includes('=') ||
//          textArray[j].includes(':') ||
//          textArray[j].includes(';') ||
//          textArray[j].includes('+') ||
//          textArray[j].includes('-') ||
//          textArray[j].includes('*') ||
//          textArray[j].includes('<') ||
//          textArray[j].includes('>')
//        ) {
//          addNewSpan(elementArray[i], 'punctuation', textArray[j])
//        } else if (
//          textArray[j].includes('{') ||
//          textArray[j].includes('[') ||
//          textArray[j].includes('(')
//        ) {
//          if (bracketCount > 3) {
//            bracketCount = 1
//          }
//          addNewSpan(
//            elementArray[i],
//            'bracket-' + bracketCount.toString(),
//            textArray[j]
//          )
//          bracketCount++
//        } else if (
//          textArray[j].includes('}') ||
//          textArray[j].includes(']') ||
//          textArray[j].includes(')')
//        ) {
//          bracketCount--
//          if (bracketCount < 1) {
//            bracketCount = 3
//          }
//          addNewSpan(
//            elementArray[i],
//            'bracket-' + bracketCount.toString(),
//            textArray[j]
//          )
//        } else if (
//          textArray[j] == 'let' ||
//          textArray[j] == 'const' ||
//          textArray[j] == 'true' ||
//          textArray[j] == 'false' ||
//          textArray[j] == 'function'
//        ) {
//          addNewSpan(elementArray[i], 'keyword', textArray[j])
//        } else if (
//          textArray[j] == 'if' ||
//          textArray[j] == 'else' ||
//          textArray[j] == 'for' ||
//          textArray[j] == 'switch' ||
//          textArray[j] == 'case' ||
//          textArray[j] == 'default' ||
//          textArray[j] == 'break'
//        ) {
//          addNewSpan(elementArray[i], 'statement', textArray[j])
//        } else if (functionArray.includes(textArray[j])) {
//          addNewSpan(elementArray[i], 'function', textArray[j])
//        } else {
//          addNewSpan(elementArray[i], 'variable', textArray[j])
//        }
//      } else {
//        if (textArray[j].includes('"') || textArray[j].includes("'")) {
//          if (quotationMarker === textArray[j]) {
//            isQuotation = false
//            quotationText += textArray[j]
//            addNewSpan(elementArray[i], 'string', quotationText)
//          } else {
//            quotationText += textArray[j]
//          }
//        } else {
//          quotationText += textArray[j]
//        }
//      }
//    } else {
//      if (
//        j > 0 &&
//        textArray[j].includes('/') &&
//        textArray[j - 1].includes('*')
//      ) {
//        isComment = false
//        commentText += textArray[j]
//        addNewSpan(elementArray[i], 'comment', commentText)
//      } else {
//        commentText += textArray[j]
//      }
//    }
//    if (j == textArray.length - 1) {
//      if (isComment == true) {
//        addNewSpan(elementArray[i], 'comment', commentText)
//      } else if (isQuotation == true) {
//        addNewSpan(elementArray[i], 'string', quotationText)
//      }
//    }
//  }
//}
//
//function addNewSpan(fParent, fClass, fText) {
//  let fChild = document.createElement('span')
//  fParent.appendChild(fChild)
//  if (fClass !== false) {
//    fChild.classList.add(fClass)
//  }
//  fChild.innerHTML = fText
//}
//
//function isNumeric(str) {
//  if (typeof str != 'string') return false // we only process strings!
//  return (
//    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
//    !isNaN(parseFloat(str))
//  ) // ...and ensure strings of whitespace fail
//}
//
//function replaceLtGt(fText) {
//  fText = fText.replaceAll('&gt;', '<')
//  fText = fText.replaceAll('&lt;', '>')
//  return fText
//}
//
////function isNonSpaceWhitespace(fText) {
////  if (/\s/.test(fText) === true && fText !== ' ') {
////    return true
////  } else {
////    return false
////  }
////}
//
//function RemoveNonSpaceWhitespace(fText) {
//  fText = fText.replaceAll(/\n\s+/g, ' ')
//  return fText
//}
//
//function RemoveNaNFromArray(fArray) {
//  fArray = fArray.filter((element) => element !== '')
//  //console.log(fArray)
//  return fArray
//}
//
////function removeCharAtIndex(str, index) {
////  if (index < 0 || index >= str.length) {
////    console.error('Index out of bounds.')
////    return str // Return original string if index is invalid
////  }
////  return str.slice(0, index) + str.slice(index + 1)
////}
//
//function AddIndent(fElement, fText) {
//  let fIndentNumber = 0
//  let fClassNameString = ''
//  let fNewText = ''
//  let fClassNameArray = Array.from(fElement.classList)
//  for (const className of fClassNameArray) {
//    if (className.includes('text-indent-') == true) {
//      fIndentNumber = Number(className[className.length - 1])
//    }
//  }
//  for (let l = 0; l < fIndentNumber; l++) {
//    fNewText += '  '
//    fText = fNewText + fText
//    //console.log(fText)
//  }
//
//  return fText
//}
// test stuff //

const name = 'Nigel the Magnificent'

let age = 111

const magicTricks = [
  'one card monte',
  '52 card pick up',
  'dude wheres my car?',
  'pulling a hat out of a rabbit',
  "I'll do this with my hands",
]
magicTricks[3] = 'something less horrifying for the children'
magicTricks.push('cutting a pigeon in half with a stick')
let favouriteTrick = magicTricks[0] //favouriteTrick is now "one card monte"

const minion = {
  name: 'Bilbo',
  age: 50,
  profession: 'Burglar',
}
console.log(minion.name) // will log "Bilbo"
console.log(minion['age']) // will log "50"
let selectedProperty = 'profession'
console.log(minion[selectedProperty]) // will log "Burglar"

let amIAConjurerOfCheapTricks = false
if (amIAConjurerOfCheapTricks == false) {
  console.log('I am not trying to rob you, I am trying to help you')
} else {
  Console.log('I am not trying to help you, I am trying to rob you')
} // will log "I am not trying to rob you, I am trying to help you"

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
} // will log 'you shall not pass!'

let sentenceStart = 'Ho'
let sentenceMid = 'ld the '
let sentenceEnd = 'door!'
for (let i = 0; i <= sentenceMid.length; i++) {
  let newSentenceMid = sentenceMid.substring(0, sentenceMid.length - i)
  console.log(sentenceStart + newSentenceMid + sentenceEnd)
}

// will log 'Hold the door!'
//          'Hold thedoor!'
//          'Hold thdoor!'
//          'Hold tdoor!'
//          'Hold door!'
//          'Holddoor!'
//          'Holdoor!'
//          'Hodoor!'

let spell = 'wingardium leviosaar'
let featherFloating = false
function checkSpell(testSpell) {
  if (testSpell == 'wingardium leviosa') {
    featherFloating = true
  } else {
    console.log("It's wingardium leviosa, not " + testSpell + '!')
  }
}
checkSpell(spell) // will log "It's wingardium leviosa, not wingardium leviosaar!"
