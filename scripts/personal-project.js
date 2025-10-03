let currentPage = document.getElementsByTagName('title')[0].innerHTML
let isIndex = false

let navList = [
  { name: 'Home', link: 'index.html' },
  { name: 'Te-Houtaewa', link: 'te-houtaewa-template.html' },
  { name: 'CSS - Display', link: 'html-css.html' },
  { name: 'Identity & Values', link: 'identity-values.html' },
  { name: 'Learning Plan', link: 'learning-plan.html' },
  { name: 'Javascript & the DOM', link: 'javascript-dom.html' },
  { name: 'Emotional Intelligence', link: 'emotional-intelligence.html' },
  { name: 'Neuroplasticity', link: 'neuroplasticity.html' },
  { name: 'The Growth Mindset', link: 'growth-mindset.html' },
  { name: 'Te Whare Tapa Whā', link: 'te-whare-tapa-wha.html' },
  { name: 'Problem Solving', link: 'problem-solving.html' },
  { name: 'Human Skills', link: 'foundations-reflection.html' },
  { name: 'Personal Project', link: 'personal-project.html' },
]

editNavList() // makes changes to links in navList depending if index or blog
populateSidenav() // adds navList links to sideNav

// ------- Functions ------- //

function editNavList() {
  navList.forEach(function (element, index) {
    if (index !== 0) {
      element.link = 'blog/' + element.link
    }
  })
}

function populateSidenav() {
  let sidenavParent = document.getElementsByClassName('sidenav')[0]
  navList.forEach(function (element) {
    addNewSidenavLink(sidenavParent, element.name, element.link)
  })
}

function addNewSidenavLink(fparent, ftext, flink) {
  let fchild = document.createElement('a')
  fparent.appendChild(fchild)
  fchild.innerHTML = ftext
  fchild.href = flink
}

//----- JavaScript Display -----//
//const standardFunctionArray = [
//  'getElementsByClassName',
//  'split',
//  'includes',
//  'push',
//  'log',
//  'filter',
//  'toLowerCase',
//  'join',
//  'forEach',
//] // list of built in functions and methods <-- ADD ANY MISSING BUILT IN FUNCTIONS AND METHODS TO THE ARRAY
//
//let customFunctionArray = [] // <-- ADD YOUR CUSTOM FUNCTIONS AND METHODS TO THE ARRAY
//
//let functionArray = standardFunctionArray.concat(customFunctionArray)

const classArray = [
  'number',
  'string',
  'keyword',
  'function',
  'bracket-1',
  'bracket-2',
  'bracket-3',
  'variable',
  'operator',
  'conditional',
  'comment',
  'custom-1',
  'custom-2',
  'custom-3',
  'custom-4',
]

let bracketCount = 0
let isComment = false
let commentMarker = ''
let isQuotation = false
let quotationMarker = ''
let quotationText = ''
let commentText = ''
let pText = ''
let clickSetting
let hoverColor = '#ffd90070'
const root = document.documentElement
root.style.setProperty('--hover-color', '#ffd90000')

let formText = document.getElementById('formText')
//customFunctionInput = document.getElementById('customFunctionInput')
exampleContainer = document.getElementById('exampleContainer')
htmlContainer = document.getElementById('htmlContainer')
classButton = document.getElementById('classButton')
let mouseDisplay = document.getElementById('mouseDisplay')
formText.addEventListener('input', (event) => {
  highlight(event.target.value)
})

document.addEventListener('mousemove', mouseDisplayMove)

classButton.addEventListener('click', changeClassButtonPressed)

customFunctionInput.addEventListener('input', (event) => {
  changeCustomFunctionArray(event.target.value)
})

//function changeCustomFunctionArray(text) {
//  customFunctionArray = text.split(',')
//  customFunctionArray.forEach((string, index) => {
//    customFunctionArray[index] = string.trim()
//  })
//  functionArray = standardFunctionArray.concat(customFunctionArray)
//  highlight(formText.value)
//}
resizeTextarea()
function highlight(text) {
  removeSpanListeners()
  exampleContainer.innerHTML = ''
  htmlContainer.innerHTML = ''
  bracketCount = 0
  if (text !== '') {
    let textArray = text.split('\n')
    for (let i = 0; i < textArray.length; i++) {
      resetValues()
      let openingTag = setOpeningTag(textArray[i])
      textArray[i] = formatText(textArray[i])
      let pArray = formatArray(textArray[i].trim())
      for (let j = 0; j < pArray.length; j++) {
        let index = j
        let currentString = pArray[j]
        let previousString = pArray[j - 1] || ''
        let nextString = pArray[j + 1] || ''

        if (isComment) {
          if (ifCommentEnd(previousString + currentString) || j == pArray.length - 1) {
            isComment = false
            commentText += currentString
            addNewSpan('comment', commentText)
          } else {
            commentText += currentString
          }
          continue //move to next j
        }

        if (isQuotation) {
          if (
            (ifQuotation(currentString) && quotationMarker === currentString) ||
            j == pArray.length - 1
          ) {
            isQuotation = false
            quotationText += currentString
            addNewSpan('string', quotationText)
          } else {
            quotationText += currentString
          }
          continue
        }

        if (ifCommentStart(currentString + nextString)) {
          isComment = true
          commentMarker = currentString + nextString
          commentText = currentString
          continue
        }

        if (ifQuotation(currentString)) {
          isQuotation = true
          quotationText = currentString
          quotationMarker = currentString
          continue
        }

        if (ifNumeric(currentString)) {
          addNewSpan('number', currentString)
          continue
        }

        if (ifOperator(currentString)) {
          addNewSpan('operator', currentString)
          continue
        }

        if (ifOpenBracket(currentString)) {
          bracketCount++
          if (bracketCount > 3) {
            bracketCount = 1
          }
          addNewSpan('bracket-' + bracketCount.toString(), currentString)
          continue
        }

        if (ifClosedBracket(currentString)) {
          addNewSpan('bracket-' + bracketCount.toString(), currentString)
          bracketCount--
          if (bracketCount < 1) {
            bracketCount = 3
          }
          continue
        }

        if (ifKeyword(currentString)) {
          addNewSpan('keyword', currentString)
          continue
        }

        if (ifConditional(currentString)) {
          addNewSpan('conditional', currentString)
          continue
        }

        if (ifSpace(currentString)) {
          pText += ' '
          continue
        }

        if (ifFunction(pArray, index)) {
          addNewSpan('function', currentString)
          continue
        }

        addNewSpan('variable', currentString) // default
      }

      let outputText = openingTag + pText + '</p>'
      exampleContainer.innerHTML += outputText
      outputText = formatText(outputText)
      htmlContainer.innerHTML += "<p class='htmlText'>" + outputText + '</p>'
    }
  }
  resizeTextarea()
  addClick()
}

function removeSpanListeners() {
  //let count = 0
  exampleContainer.childNodes.forEach((element) => {
    let spanArray = element.querySelectorAll('span')
    spanArray.forEach((element) => {
      element.removeEventListener('click', spanPressed)
      element.removeEventListener('mouseover', spanHovered)
      element.removeEventListener('mouseleave', resetMouseDisplay)
      //count++
    })
  })
  //console.log(`removed ${count} listeners`)
}

function mouseDisplayMove(event) {
  const mouseX = event.pageX
  const mouseY = event.pageY
  // console.log(mouseX + ' ' + mouseY)
  mouseDisplay.style.left = mouseX + 'px'
  mouseDisplay.style.top = mouseY - 40 + 'px'
}

function setOpeningTag(str) {
  let openingTag = "<p class='exampleText'>"
  if (countLeadingSpaces(str) > 0) {
    openingTag =
      "<p class='exampleText' style='margin-left: " + countLeadingSpaces(str) * 10 + "px;'>"
  }

  return openingTag
}

function resizeTextarea() {
  formText.style.height = 'auto' // Reset height to auto to calculate new scrollHeight
  formText.style.height = formText.scrollHeight + 'px' // Set height to content's scrollHeight
  //formText.style.height = exampleContainer.style.height
}

function addClick() {
  exampleContainer.childNodes.forEach((element) => {
    let spanArray = element.querySelectorAll('span')
    spanArray.forEach((element) => {
      //element.classList.add('hoverable')
      element.addEventListener('click', spanPressed)
      element.addEventListener('mouseover', spanHovered)
      element.addEventListener('mouseleave', resetMouseDisplay)
    })
  })
}

function resetMouseDisplay() {
  mouseDisplay.classList.add('hide')
}

function formatText(text) {
  text = text.replaceAll('<', '&lt')
  text = text.replaceAll('>', '&gt')
  return text
}

//function generateHTMLText() {
//  htmlContainer.innerHTML = ''
//  exampleContainer.childNodes.forEach((element) => {
//    let outputText = formatHTMLText(element.innerHTML)
//    htmlContainer.innerHTML += "<p class='htmlText'>" + outputText + '</p>'
//  })
//}

function countLeadingSpaces(str) {
  const match = str.match(/^\s*/)
  return match[0].length
}

function formatArray(fstring) {
  //fstring = replaceLtGt(fstring)
  //fstring = standardiseSpaceWhitespace(fstring)
  //fstring = addIndent(element, fstring)
  let farray = fstring.split(/([ ,;:.+-/*<>\[\]\(\)\"\'\{\}])/)
  farray = removeEmptiesFromArray(farray)
  return farray
}

function removeEmptiesFromArray(fArray) {
  fArray = fArray.filter((element) => element !== '')
  return fArray
}

function addNewSpan(spanClass, spanText) {
  let openingTag = "<span class='"
  pText += openingTag + spanClass + "'>" + spanText + '</span>'
}

function resetValues() {
  isQuotation = false
  if (commentMarker !== '/*') {
    isComment = false
    commentMarker = ''
  }
  quotationMarker = ''
  quotationText = ''
  commentText = ''
  pText = ''
}

function changeClassButtonPressed() {
  if (clickSetting === 'changeSpanClass') {
    clickSetting = ''
    root.style.setProperty('--hover-color', '#ffd90000')
    classButton.classList.remove('active')
  } else {
    clickSetting = 'changeSpanClass'
    root.style.setProperty('--hover-color', hoverColor)
    classButton.classList.add('active')
  }
  //highlight(formText.value)
}

function spanPressed() {
  if (clickSetting === 'changeSpanClass') {
    //this.classList.remove('hoverable')
    let classIndex = classArray.indexOf(this.classList[0])
    let newClassIndex = classIndex + 1
    if (newClassIndex >= classArray.length) {
      newClassIndex = 0
    }
    this.classList.remove(classArray[classIndex])
    this.classList.add(classArray[newClassIndex])
    //this.classList.add('hoverable')
    //let pIndex = Array.prototype.indexOf.call(this.parentNode.parentNode.children, this.parentNode)
    //let spanIndex = Array.prototype.indexOf.call(this.parentNode.children, this)
    //console.log(`pIndex: ${pIndex}, spanIndex: ${spanIndex}`)
    //let htmlIndex = getIndexOfSubstringInString(htmlContainer.childNodes[pIndex].innerHTML, '<span')
    //this.className = ''
    //this.classList.add(prompt('what class do you want?'))
    generateHTML()
    mouseDisplay.className = ''
    mouseDisplay.innerHTML = this.className
    mouseDisplay.className = this.className
  }
}

function spanHovered() {
  if (clickSetting === 'changeSpanClass') {
    mouseDisplay.className = ''
    mouseDisplay.innerHTML = this.className
    mouseDisplay.className = this.className
  }
}

function generateHTML() {
  htmlContainer.innerHTML = ''
  exampleContainer.childNodes.forEach((element) => {
    let outputText = element.outerHTML
    outputText = formatText(outputText)
    htmlContainer.innerHTML += "<p class='htmlText'>" + outputText + '</p>'
  })
}

//function getIndexOfSubstringInString(str, subStr, subStrIndex) {
//  let startIndex = 0
//  let count = -1
//  let index = -1
//  while (count < subStrIndex) {
//    index = str.indexOf(subStr, startIndex)
//
//    if (index === -1) {
//      // Substring not found, or not enough occurrences
//      return -1
//    }
//
//    if (count === n) {
//      return index
//    }
//    count++
//    startIndex = index + subStr.length // Start searching after the found occurrence
//  }
//
//  return -1 // Should not reach here if n > 0 and substring exists
//}
//
//----- Loop Functions -----//

function ifCommentEnd(str) {
  return str === '*/'
}

function ifCommentStart(str) {
  return str === '/*' || str === '//'
}

function ifComment(str, nextStr) {
  if (str.includes('/')) {
    if (nextStr.includes('/')) {
      isComment = true
      commentMarker = '//'
      commentText = str
      return true
    } else if (nextStr.includes('*')) {
      isComment = true
      commentMarker = '/*'
      commentText = str
      return true
    }
    return false
  }
  return false
}

function ifQuotation(str) {
  return str.includes('"') || str.includes("'")
}

function ifNumeric(str) {
  return (
    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  )
}

function ifOperator(str) {
  return (
    str.includes('.') ||
    str.includes(',') ||
    str.includes('=') ||
    str.includes(':') ||
    str.includes(';') ||
    str.includes('+') ||
    str.includes('-') ||
    str.includes('*') ||
    str.includes('/') ||
    str.includes('<') ||
    str.includes('>') ||
    str.includes('|') ||
    str.includes('&lt') ||
    str.includes('&gt')
  )
}

function ifOpenBracket(str) {
  return str.includes('{') || str.includes('[') || str.includes('(')
}

function ifClosedBracket(str) {
  return str.includes('}') || str.includes(']') || str.includes(')')
}

function ifKeyword(str) {
  return str == 'let' || str == 'const' || str == 'true' || str == 'false' || str == 'function'
}

function ifConditional(str) {
  return (
    str == 'if' ||
    str == 'else' ||
    str == 'for' ||
    str == 'switch' ||
    str == 'case' ||
    str == 'default' ||
    str == 'break' ||
    str == 'return' ||
    str == 'continue'
  )
}

//function ifFunction(str) {
//  return functionArray.includes(str)
//}

function ifFunction(arr, ind) {
  for (let k = ind; k < arr.length; k++) {
    if (arr[k + 1] === '(') {
      return true
    } else if (arr[k + 1] !== ' ') {
      return false
    }
  }
  return false
}

function ifSpace(str) {
  return str == ' '
}

//
//
//
//
//
//
//
//
//
//
//

function oldFunction() {
  const elementArray = document.getElementsByClassName('highlight')

  let bracketCount = 0
  let isComment = false
  let commentMarker = ''
  let isQuotation = false
  let quotationMarker = ''
  let quotationText = ''
  let commentText = ''
  let textArray = []

  for (let i = 0; i < elementArray.length; i++) {
    resetValues()
    textArray = formatArray(elementArray[i].innerHTML.trim(), elementArray[i])
    elementArray[i].innerHTML = '' // remove current text from elementArray
    for (let j = 0; j < textArray.length; j++) {
      let currentElement = elementArray[i]
      let currentString = textArray[j]
      let previousString = textArray[j - 1] || ''
      let nextString = textArray[j + 1] || ''

      if (isComment) {
        if (ifCommentEnd(previousString + currentString) || j == textArray.length - 1) {
          isComment = false
          commentText += currentString
          addNewSpan(currentElement, 'comment', commentText)
        } else {
          commentText += currentString
        }
        continue //move to next j
      }

      if (isQuotation) {
        if (
          (ifQuotation(currentString) && quotationMarker === currentString) ||
          j == textArray.length - 1
        ) {
          isQuotation = false
          quotationText += currentString
          addNewSpan(currentElement, 'string', quotationText)
        } else {
          quotationText += currentString
        }
        continue
      }

      if (ifCommentStart(currentString + nextString)) {
        isComment = true
        commentMarker = currentString + nextString
        commentText = currentString
        continue
      }

      if (ifQuotation(currentString)) {
        isQuotation = true
        quotationText = currentString
        quotationMarker = currentString
        continue
      }

      if (ifNumeric(currentString)) {
        addNewSpan(currentElement, 'number', currentString)
        continue
      }

      if (ifOperator(currentString)) {
        addNewSpan(currentElement, 'operator', currentString)
        continue
      }

      if (ifOpenBracket(currentString)) {
        bracketCount++
        if (bracketCount > 3) {
          bracketCount = 1
        }
        addNewSpan(elementArray[i], 'bracket-' + bracketCount.toString(), currentString)
        continue
      }

      if (ifClosedBracket(currentString)) {
        addNewSpan(elementArray[i], 'bracket-' + bracketCount.toString(), currentString)
        bracketCount--
        if (bracketCount < 1) {
          bracketCount = 3
        }
        continue
      }

      if (ifKeyword(currentString)) {
        addNewSpan(currentElement, 'keyword', currentString)
        continue
      }

      if (ifConditional(currentString)) {
        addNewSpan(currentElement, 'conditional', currentString)
        continue
      }

      if (ifFunction(currentString)) {
        addNewSpan(currentElement, 'function', currentString)
        continue
      }

      addNewSpan(currentElement, 'variable', currentString) // default
    }
  }

  function resetValues() {
    isQuotation = false
    if (commentMarker !== '/*') {
      isComment = false
      commentMarker = ''
    }
    quotationMarker = ''
    quotationText = ''
    commentText = ''
  }

  function formatArray(fstring, element) {
    fstring = replaceLtGt(fstring)
    fstring = standardiseSpaceWhitespace(fstring)
    fstring = addIndent(element, fstring)
    let farray = fstring.split(/([ ,;:.+-/*<>\[\]\(\)\"\'\{\}])/)
    farray = removeEmptiesFromArray(farray)
    return farray
  }

  function addNewSpan(fParent, fClass, fText) {
    let fChild = document.createElement('span')
    fParent.appendChild(fChild)
    if (fClass !== false) {
      fChild.classList.add(fClass)
    }
    fChild.innerHTML = fText
  }

  //function isNumeric(str) {
  //  if (typeof str != 'string') return false // we only process strings!
  //  return (
  //    !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
  //    !isNaN(parseFloat(str))
  //  ) // ...and ensure strings of whitespace fail
  //}

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

  function standardiseSpaceWhitespace(fText) {
    fText = fText.replaceAll(/\n\s+/g, ' ')
    return fText
  }

  function removeEmptiesFromArray(fArray) {
    fArray = fArray.filter((element) => element !== '')
    return fArray
  }

  //function removeCharAtIndex(str, index) {
  //  if (index < 0 || index >= str.length) {
  //    console.error('Index out of bounds.')
  //    return str // Return original string if index is invalid
  //  }
  //  return str.slice(0, index) + str.slice(index + 1)
  //}

  function addIndent(fElement, fText) {
    let fIndentNumber = 0
    let fNewText = ''
    let fClassNameArray = Array.from(fElement.classList)
    for (const className of fClassNameArray) {
      if (className.includes('text-indent-') == true) {
        fIndentNumber = Number(className[className.length - 1])
      }
    }
    for (let l = 0; l < fIndentNumber; l++) {
      fNewText += '  '
      fText = fNewText + fText
      //console.log(fText)
    }

    return fText
  }

  // inner loop functions

  function ifCommentEnd(str) {
    return str === '*/'
  }

  function ifCommentStart(str) {
    return str === '/*' || str === '//'
  }

  function continueComment(i, j) {
    if (j > 0 && textArray[j].includes('/') && textArray[j - 1].includes('*')) {
      isComment = false
      commentText += textArray[j]
      addNewSpan(elementArray[i], 'comment', commentText)
    } else {
      commentText += textArray[j]

      if (j == textArray.length - 1) {
        addNewSpan(elementArray[i], 'comment', commentText)
      }
    }
  }

  function continueQuotation(i, j) {
    if (textArray[j].includes('"') || textArray[j].includes("'")) {
      if (quotationMarker === textArray[j]) {
        isQuotation = false
        quotationText += textArray[j]
        addNewSpan(elementArray[i], 'string', quotationText)
      } else {
        quotationText += textArray[j]
        if (j == textArray.length - 1) {
          addNewSpan(elementArray[i], 'string', quotationText)
        }
      }
    } else {
      quotationText += textArray[j]
      if (j == textArray.length - 1) {
        addNewSpan(elementArray[i], 'string', quotationText)
      }
    }
  }

  function ifComment(str, nextStr) {
    if (str.includes('/')) {
      if (nextStr.includes('/')) {
        isComment = true
        commentMarker = '//'
        commentText = str
        return true
      } else if (nextStr.includes('*')) {
        isComment = true
        commentMarker = '/*'
        commentText = str
        return true
      }
      return false
    }
    return false
  }

  function ifQuotation(str) {
    return str.includes('"') || str.includes("'")
  }

  function ifNumeric(str) {
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    )
  }

  function ifOperator(str) {
    return (
      str.includes('.') ||
      str.includes(',') ||
      str.includes('=') ||
      str.includes(':') ||
      str.includes(';') ||
      str.includes('+') ||
      str.includes('-') ||
      str.includes('*') ||
      str.includes('/') ||
      str.includes('<') ||
      str.includes('>')
    )
  }

  function ifOpenBracket(str) {
    return str.includes('{') || str.includes('[') || str.includes('(')
  }

  function ifClosedBracket(str) {
    return str.includes('}') || str.includes(']') || str.includes(')')
  }

  function ifKeyword(str) {
    return str == 'let' || str == 'const' || str == 'true' || str == 'false' || str == 'function'
  }

  function ifConditional(str) {
    return (
      str == 'if' ||
      str == 'else' ||
      str == 'for' ||
      str == 'switch' ||
      str == 'case' ||
      str == 'default' ||
      str == 'break'
    )
  }

  function ifFunction(str) {
    return functionArray.includes(str)
  }
}
