export function formatNumber(x: number) {
  if (Math.abs(x) > 1) {
    return x.toFixed(1);
  }

  return x.toPrecision(2);
}
