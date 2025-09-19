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
]

checkIfIsIndex() // if page is index.html, isIndex = true
editNavList() // makes changes to links in navList depending if index or blog
populateSidenav() // adds navList links to sideNav

// ------- Functions ------- //

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
]

const customFunctionArray = ['checkSpell', 'deBee', 'splice']

functionArray = standardFunctionArray.concat(customFunctionArray)

const elementArray = document.getElementsByClassName('highlight')

let bracketCount = 1
let isComment = false
let commentMarker = ''
for (let i = 0; i < elementArray.length; i++) {
  let isQuotation = false
  if (commentMarker !== '/*') {
    isComment = false
    commentMarker = ''
  }
  let quotationMarker = ''
  let quotationText = ''
  let commentText = ''
  let rawText = elementArray[i].innerHTML.trim()
  rawText = replaceLtGt(rawText)
  rawText = RemoveNonSpaceWhitespace(rawText)
  rawText = AddIndent(elementArray[i], rawText)
  let textArray = rawText.split(/([ ,;:.+-/*<>\[\]\(\)\"\'\{\}])/)
  textArray = RemoveNaNFromArray(textArray)
  elementArray[i].innerHTML = ''
  //console.log(textArray)
  for (let j = 0; j < textArray.length; j++) {
    if (isComment == false) {
      if (isQuotation == false) {
        if (textArray[j].includes('/')) {
          if (textArray[j + 1].includes('/')) {
            //console.log('//')
            isComment = true
            commentMarker = '//'
            commentText = textArray[j]
          } else if (textArray[j + 1].includes('*')) {
            isComment = true
            commentMarker = '/*'
            commentText = textArray[j]
          } else {
            addNewSpan(elementArray[i], 'punctuation', textArray[j])
          }
        } else if (textArray[j].includes('*')) {
        } else if (textArray[j].includes('"') || textArray[j].includes("'")) {
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
          textArray[j] == 'false' ||
          textArray[j] == 'function'
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
      if (
        j > 0 &&
        textArray[j].includes('/') &&
        textArray[j - 1].includes('*')
      ) {
        isComment = false
        commentText += textArray[j]
        addNewSpan(elementArray[i], 'comment', commentText)
      } else {
        commentText += textArray[j]
      }
    }
    if (j == textArray.length - 1) {
      if (isComment == true) {
        addNewSpan(elementArray[i], 'comment', commentText)
      } else if (isQuotation == true) {
        addNewSpan(elementArray[i], 'string', quotationText)
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

function RemoveNonSpaceWhitespace(fText) {
  fText = fText.replaceAll(/\n\s+/g, ' ')
  return fText
}

function RemoveNaNFromArray(fArray) {
  fArray = fArray.filter((element) => element !== '')
  //console.log(fArray)
  return fArray
}

//function removeCharAtIndex(str, index) {
//  if (index < 0 || index >= str.length) {
//    console.error('Index out of bounds.')
//    return str // Return original string if index is invalid
//  }
//  return str.slice(0, index) + str.slice(index + 1)
//}

function AddIndent(fElement, fText) {
  let fIndentNumber = 0
  let fClassNameString = ''
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
