export default function calcPercentage(x, y) {
  if (x !== y) {
    return Math.round((x / y) * 100);
  }
}
