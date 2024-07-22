

const hasSpaceInPuzzle = (dimensionMatrix: number, currentPosition: [number, number], lengthOfWord: number) => {
  let hasSpaceHorizontally = false
  let hasSpaceVertically = false
  // verify horizontally
  if (Math.abs(currentPosition[1] - dimensionMatrix) >= lengthOfWord)
    hasSpaceHorizontally = true
  // verify vertically
  if (Math.abs(currentPosition[0] - dimensionMatrix) >= lengthOfWord)
    hasSpaceVertically = true
  // verify diagonally
  if (hasSpaceHorizontally && hasSpaceVertically)
    return true

  return [hasSpaceHorizontally, hasSpaceVertically].some(Boolean)
}

export {
  hasSpaceInPuzzle
}