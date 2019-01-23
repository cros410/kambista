'use strict'

/**
 * Method for do an exchange with a given tc
 *
 * @param {Object} tcKambista the float number to use into of exchanges calcs
 * @param {Number} amountSent amount of money desire to exchange
 * @param {String} originCurrency the currency code to represented for the amountSent coin
 * @param {String} destinationCurrency the currency code for destination kind of coin
 * @return {Object} An object with data result from calcs
 */
function calculate (tcKambista, amountSent, originCurrency, destinationCurrency) {
  let payload = {
    savings: 0
  }
  switch (originCurrency) {
    case 'USD':
      switch (destinationCurrency) {
        case 'PEN':
          // payload.exchangeRate = coupon ? parseFloat(parseFloat(ktc.bid_exchange_rate) + parseFloat(coupon.bid)).toFixed(3) : ktc.bid_exchange_rate
          payload.exchangeRate = tcKambista.bid
          payload.result = parseFloat(parseFloat(amountSent * payload.exchangeRate).toFixed(2))
          // payload.savings = Math.abs(parseFloat(payload.result - (amountSent * bankTc.bid)).toFixed(2))
          break
        case 'USD':
          // payload.exchangeRate = coupon ? parseFloat(parseFloat(ktc.ask_exchange_rate) - parseFloat(coupon.ask)).toFixed(3) : ktc.ask_exchange_rate
          payload.exchangeRate = tcKambista.ask
          payload.result = parseFloat(parseFloat(amountSent * payload.exchangeRate).toFixed(2))
          // payload.savings = Math.abs(parseFloat((payload.result - (req.amount_sent * bankTc.ask)) * ktc.bid_exchange_rate).toFixed(2))
          break
        default:
          payload.message = 'Moneda de destino no existe'
          break
      }
      break
    case 'PEN':
      switch (destinationCurrency) {
        case 'USD':
          // payload.exchangeRate = coupon ? parseFloat(parseFloat(ktc.ask_exchange_rate) - parseFloat(coupon.ask)).toFixed(3) : ktc.ask_exchange_rate
          payload.exchangeRate = tcKambista.ask
          payload.result = parseFloat(parseFloat(amountSent / payload.exchangeRate).toFixed(2))
          // payload.savings = Math.abs(parseFloat((payload.result - (amountSent / bankTc.ask)) * tcKambista.bid).toFixed(2))
          break
        case 'PEN':
          // payload.exchangeRate = coupon ? parseFloat(parseFloat(ktc.bid_exchange_rate) + parseFloat(coupon.bid)).toFixed(3) : ktc.bid_exchange_rate
          payload.exchangeRate = tcKambista.bid
          payload.result = parseFloat(parseFloat(amountSent / payload.exchangeRate).toFixed(2))
          // payload.savings = Math.abs(parseFloat(payload.result - (amountSent / bankTc.bid)).toFixed(2))
          break
        default:
          payload.message = 'Moneda de destino no existe'
          break
      }
      break
    default:
      payload.message = 'Conversión no válida. Moneda de origen no existe'
      break
  }
  return payload
}

module.exports = calculate

// Allow use of default import syntax in TypeScript
module.exports.default = calculate
