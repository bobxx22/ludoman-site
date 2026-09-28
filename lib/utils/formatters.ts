export const formatNumber = (num: number): string => {
  return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const formatCurrency = (amount: number, decimals = 2): string => {
  return `$${amount.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })}`
}

export const formatTokenAmount = (amount: string | number, decimals = 2): string => {
  const num = typeof amount === "string" ? Number.parseFloat(amount) : amount
  return num.toFixed(decimals)
}

export const truncateAddress = (address: string, startChars = 5, endChars = 4): string => {
  if (address.length <= startChars + endChars) return address
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`
}
