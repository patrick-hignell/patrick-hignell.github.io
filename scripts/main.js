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
