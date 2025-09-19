// make array of words.
// check if array elements are queal to buzz (compare in lower case but preserve original capitalisation)
// remove buzz
// join string and return

let stringArray = sentence.split(' ')
let newStringArray = [...stringArray]

function deBee(sentence) {
  let stringArray = sentence.split(' ')
  let newStringArray = stringArray
  stringArray.forEach(function (element, index) {
    console.log(element.toLowerCase())
    if (element.toLowerCase() === 'buzz') {
      console.log('is buzz at ' + index)
      console.log(newStringArray.splice(index, 1))
    }
  })
  console.log(newStringArray)
  console.log(stringArray)
  return newStringArray.join(' ')
}

function deBee(sentence) {
  let stringArray = sentence.split(' ')
  let newStringArray = stringArray.filter(
    (string) => string.toLowerCase() !== 'buzz'
  )
  return newStringArray.join(' ')
}

deBee("Help! buzz I'm buzz buzz surrounded buzz by buzz buzz bees!!")
