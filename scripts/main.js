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

if (document.getElementsByTagName('title')[0].innerHTML === 'Learning Plan') {
  let bootcampArray = [
    document.getElementById('bootcampScrollHandle'),
    document.getElementById('bootcampBottomHandle'),
  ]

  bootcampArray.forEach((element) => {
    element.onclick = scrollInteractBootcamp
  })

  let foundationsArray = [
    document.getElementById('foundationsScrollHandle'),
    document.getElementById('foundationsBottomHandle'),
  ]

  foundationsArray.forEach((element) => {
    element.onclick = scrollInteractFoundations
  })
}

checkIfIsIndex() // if page is index.html, isIndex = true
editNavList() // makes changes to links in navList depending if index or blog
populateSidenav() // adds navList links to sideNav

// ------- Functions ------- //

function scrollInteractBootcamp() {
  let container = document.getElementById('bootcampScrollContainer')
  container.classList.toggle('hide')
}

function scrollInteractFoundations() {
  let container = document.getElementById('foundationsScrollContainer')
  container.classList.toggle('hide')
}

function checkIfIsIndex() {
  if (currentPage === "Patrick's Coding Adventure") {
    isIndex = true
  }
}

function editNavList() {
  if (isIndex === true) {
    navList.forEach(function (element, index) {
      if (index !== 0) {
        element.link = 'blog/' + element.link
      }
    })
  } else {
    navList[0].link = '../index.html'
  }
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

//function addNewChild(fparent, ftag, fclass, ftext) {
//  let fchild = document.createElement(ftag)
//  fparent.appendChild(fchild)
//  if (fclass !== false) {
//    fChild.classList.add(fclass)
//  }
//  fchild.innerHTML = ftext
//}

//---JavaScript Display---
const standardFunctionArray = [
  'getElementsByClassName',
  'split',
  'includes',
  'push',
  'log',
  'filter',
  'toLowerCase',
  'join',
  'forEach',
] // list of built in functions and methods <-- ADD ANY MISSING BUILT IN FUNCTIONS AND METHODS TO THE ARRAY

const customFunctionArray = ['checkSpell', 'deBee', 'splice'] // <-- ADD YOUR CUSTOM FUNCTIONS AND METHODS TO THE ARRAY

functionArray = standardFunctionArray.concat(customFunctionArray)

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
