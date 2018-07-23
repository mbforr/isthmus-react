export const formatPrice = (amount) => (
  (amount || 0).toLocaleString('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
    currencyDisplay: 'symbol'
  })
)

export const debounce = (fn, time = 300) => {
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  }
}
