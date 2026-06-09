export function currencySymbol(code = 'USD') {
  return code === 'KES' ? 'KSh' : '$';
}

export function formatPrice(value, code = 'USD') {
  const symbol = currencySymbol(code);
  return `${symbol}${Number(value || 0).toLocaleString()}`;
}
