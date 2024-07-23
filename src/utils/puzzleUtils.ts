
type puzzleType = string[][]
type hasSpaceInPuzzleResult = {
  hasSpaceHorizontally: boolean,
  hasSpaceVertically: boolean,
  hasSpaceDiagonally: boolean
}

const generateMatrix = (dimension: number): puzzleType => {
  const matrix: puzzleType = Array(...Array(dimension * dimension)).reduce((resultValue, currentValue, index, array) => {
    resultValue = [...resultValue, array.splice(0,dimension).map(index => ' ')]
    return resultValue
  },[])

  return matrix
}

const hasSpaceInPuzzle = (dimensionMatrix: number, currentPosition: [number, number], lengthOfWord: number): hasSpaceInPuzzleResult => {
  const hasSpaceHorizontally = Math.abs(currentPosition[1] - dimensionMatrix) >= lengthOfWord
  const hasSpaceVertically = Math.abs(currentPosition[0] - dimensionMatrix) >= lengthOfWord
  const hasSpaceDiagonally = hasSpaceHorizontally && hasSpaceVertically

  return {
    hasSpaceHorizontally,
    hasSpaceVertically,
    hasSpaceDiagonally
  }
}

const hasAnotherWords = (matrix: string[][], currentPosition: [number, number], dimension: number) => {
  const puzzleRow = Array(...Array(dimension).keys()).map(value => matrix[currentPosition[0]][value]).join('')
  const puzzleColumn = Array(...Array(dimension).keys()).map(value => matrix[value][currentPosition[1]]).join('')



  console.log({
    puzzleRow,
    puzzleColumn
  })


}

export {
  hasSpaceInPuzzle,
  hasAnotherWords,
  generateMatrix
}