const {
  invoice,
  plays
} = require('./data/data')

const statement = require('./r-statement.js')
const R = require('ramda')
const print = console.log

print(statement(invoice, plays))

// const amountForTragedy = (audience) => {
//   result = 40000
//   if (audience > 30) {
//     result += 1000 * (audience - 30)
//   }
//   return result
// }
// const amountForComedy = (audience) => {
//   result = 30000
//   if (audience > 20) {
//     result += 10000 + 500 * (audience - 2)
//   }
//   result += 300 * audience
//   return result
// }

// const performanceTypeError = (type) => {
//   throw new Error(`unknown type: ${type}`)
// }

// const amountFor = (type, audience) => R.cond([
//   [R.equals('tragedy'), () => amountForTragedy(audience)],
//   [R.equals('comedy'), () => amountForComedy(audience)],
//   [R.T, performanceTypeError]
// ])(type)

// print(amountFor('tragedy', 100))