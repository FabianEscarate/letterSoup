
export const sum = (...numbers: number[]) => {
  return numbers.reduce((total, numberToSum) => total += numberToSum, 0)
}


export const main = () => {
  console.log(`sum of 1, 2, 10 it's:`)
  console.log(sum(1, 2, 10))
}