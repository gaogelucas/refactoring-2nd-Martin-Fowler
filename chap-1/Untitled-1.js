const R = require('ramda')

const newfile = {
  a: 1
}

console.log(R.equals(1, newfile.a))