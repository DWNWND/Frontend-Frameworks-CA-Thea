export default function calcPercentage(x, y) {
  if (x !== y) {
    const percentage = Math.round((x / y) * 100);
    const discount = 100 - percentage;
    return discount;
  }
}
