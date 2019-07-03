const {
  invoice,
  plays
} = require('./data/data')

const statement = require('./r-statement.js')
const print = console.log

print(statement(invoice, plays))