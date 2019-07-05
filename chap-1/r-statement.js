const R = require('ramda')

module.exports = function statement(invoice, plays) {
  // Play, PlayType and Audience
  const performancePlay = R.pipe(R.prop('playID'), R.prop(R.__, plays))
  const performanceType = perf => R.prop('type', performancePlay(perf))
  const performanceAudience = R.prop('audience')
  
  // Amount
  const amountForTragedy = (audience) => {
    let result = 40000
    if (audience > 30) {
      result += 1000 * (audience - 30)
    }
    return result
  }
  const amountForComedy = (audience) => {
    let result = 30000
    if (audience > 20) {
      result += 10000 + 500 * (audience - 2)
    }
    result += 300 * audience
    return result
  }
  const performanceTypeError = (type) => {
    throw new Error(`unknown type: ${type}`)
  }
  const amountFor = (type, audience) => R.cond([
    [R.equals('tragedy'), () => amountForTragedy(audience)],
    [R.equals('comedy'), () => amountForComedy(audience)],
    [R.T, performanceTypeError]
  ])(type)
  
  // Credit
  const creditFor = (type, audience) => R.max(audience - 30, 0) + R.when(R.equals('comedy'), Math.floor(audience / 5), R.always(0))(type)

  // Summary and Sumarries
  const performanceSummary = (perf) => {
    const play = performancePlay(perf)
    const type = performanceType(perf)
    const playName = R.prop('name', play)
    const audience = performanceAudience(perf)
    const amount = amountFor(type, audience)
    const credit = creditFor(type, audience)
    const result = `  ${playName}: ${format(amount/100)} (${audience} seats)\n`
    return {
      playName,
      type,
      audience,
      amount,
      credit,
      result
    }
  }
  const performanceSummaries = perfs => R.map(performanceSummary, perfs)
  
  // Total Results, Total Credit, and Total Amount
  const propMap = R.curry((prop, objs) => R.map(R.prop(prop), objs))
  const totalResults = R.pipe(propMap('result'), R.join(''))
  const totalCredit = R.pipe(propMap('credit'), R.reduce(R.add, 0))
  const totalAmount = R.pipe(propMap('amount'), R.reduce(R.add, 0))
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2
  }).format

  // Get And Return
  const getResults = (invoice) => {
    const summaries = performanceSummaries(invoice.performances)
    result0 = `Statement for ${invoice.customer}\n`
    result1 = totalResults(summaries)
    result2 = `Amount owed is ${format(totalAmount(summaries) / 100)}\n`
    result3 = `You earned ${totalCredit(summaries)} credits\n`
    const results = R.join('', [
      result0, result1, result2, result3
    ])
    return results
  }
  return getResults(invoice)
}