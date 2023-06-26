export const parseToBrl = (amount = 0) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount)
}

export const getTotalPrice = (items: Game[]) => {
  return items.reduce((acc, currentPrice) => {
    if (currentPrice.prices.current) {
      return (acc += currentPrice.prices.current)
    }
    return 0
  }, 0)
}
