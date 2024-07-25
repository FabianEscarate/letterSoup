
type puzzleType = string[][]
type hasSpaceInPuzzleResult = {
  hasSpaceHorizontally: boolean,
  hasSpaceVertically: boolean,
  hasSpaceDiagonally: boolean
}
export type orientationType = "horizontally" | "vertically" | "diagonally" | false

const generateMatrix = (dimension: number): puzzleType => {
  const matrix: puzzleType = Array(...Array(dimension * dimension)).reduce((resultValue, currentValue, index, array) => {
    resultValue = [...resultValue, array.splice(0, dimension).map(index => ' ')]
    return resultValue
  }, [])

  return matrix
}

const getCordsByMatrix = (matrix: string[][]) => {
  const [lengthX, lengthY] = [matrix.length, matrix[0].length]

  const result = []

  for (let x = 0; x < lengthX; x++)
    for (let y = 0; y < lengthY; y++)
      result.push([x, y])

  return result
}

const hasAnotherLetters = (space:string) => !/[A-Z]|Á|É|Í|Ó|Ú/i.test(space)

const hasSpaceInPuzzle = (dimensionMatrix: number, currentPosition: [number, number], lengthOfWord: number, matrix: string[][]): hasSpaceInPuzzleResult => {
  const [cordX, cordY] = currentPosition
  const diffHorizontally = dimensionMatrix - cordY
  const diffVertically = dimensionMatrix - cordX
  const diffDiagonally = diffHorizontally < diffVertically ? diffHorizontally : diffVertically

  const puzzleRow = Array(...Array(diffHorizontally).keys()).map(value => matrix[cordX][cordY + value]).join('')
  const puzzleColumn = Array(...Array(diffVertically).keys()).map(value => matrix[cordX + value][cordY]).join('')
  const puzzleDiagonal = Array(...Array(diffDiagonally).keys()).map(value => matrix[cordX + value][cordY + value]).join('')

  const hasSpaceHorizontally = diffHorizontally >= lengthOfWord && hasAnotherLetters(puzzleRow)
  const hasSpaceVertically = diffVertically >= lengthOfWord && hasAnotherLetters(puzzleColumn)
  const hasSpaceDiagonally = hasSpaceHorizontally && hasSpaceVertically && hasAnotherLetters(puzzleDiagonal)

  return {
    hasSpaceHorizontally,
    hasSpaceVertically,
    hasSpaceDiagonally
  }
}

const putWordHorizontally = (word: string, currentPosition: [number, number], matrix: string[][]) => {
  const wordToArray = Array.from(word)
  const [X, Y] = currentPosition
  wordToArray.forEach((letter: string, index: number) => {
    matrix[X][Y + index] = letter
  })
}

const putWordVertically = (word: string, currentPosition: [number, number], matrix: string[][]) => {
  const wordToArray = Array.from(word)
  const [X, Y] = currentPosition
  wordToArray.forEach((letter: string, index: number) => {
    matrix[X + index][Y] = letter
  })
}

const putWordDiagonally = (word: string, currentPosition: [number, number], matrix: string[][]) => {
  const wordToArray = Array.from(word)
  const [X, Y] = currentPosition
  wordToArray.forEach((letter: string, index: number) => {
    matrix[X + index][Y + index] = letter
  })
}

const putWord = (word: string, matrix: string[][], currentPosition: [number, number], orientation: orientationType) => {
  switch (orientation) {
    case "diagonally":
      putWordDiagonally(word, currentPosition, matrix)
      break;
    case "vertically":
      putWordVertically(word, currentPosition, matrix)
      break;
    case "horizontally":
      putWordHorizontally(word, currentPosition, matrix)
      break;
  }
}

export {
  hasSpaceInPuzzle,
  generateMatrix,
  getCordsByMatrix,
  putWord
}