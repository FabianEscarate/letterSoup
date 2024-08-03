
type puzzleType = string[][]
type hasSpaceInPuzzleResult = {
  hasSpaceHorizontally: boolean,
  hasSpaceVertically: boolean,
  hasSpaceDiagonally: boolean
}
type dimensionPuzzleType = {
  rows: number,
  columns: number
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

const getDimensionFromMatrix = (matrix: string[][]): dimensionPuzzleType => {
  return {
    rows: matrix.length,
    columns: matrix[0].length
  }
}

const getDiagonalLineByCords = (dimension: dimensionPuzzleType, matrix: string[][], cords: [number, number]) => {
  const { rows, columns } = dimension
  const [cordX, cordY] = cords
  const mainDiagonal = [];

  for (let i = Math.max(0, cordX - cordY); i < Math.min(rows, rows + cordX - cordY); i++) {
    const j = i - (cordX - cordY);
    if (0 <= j && j < columns) {
      mainDiagonal.push(matrix[i][j]);
    }
  }

  return mainDiagonal.join('')
}

const getAntiDiagonalLineByCords = (dimension: dimensionPuzzleType, matrix: string[][], cords: [number, number]) => {
  const { rows, columns } = dimension
  const [cordX, cordY] = cords
  const antiDiagonal = [];

  for (let i = Math.max(0, cordX + cordY - columns + 1); i < Math.min(rows, cordX + cordY + 1); i++) {
    const j = cordX + cordY - i;
    if (0 <= j && j < columns) {
      antiDiagonal.push(matrix[i][j]);
    }
  }

  return antiDiagonal.reverse().join('')
}

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
  const hasSpaceDiagonally = puzzleDiagonal.length >= lengthOfWord && hasAnotherLetters(puzzleDiagonal)

  return {
    hasSpaceHorizontally,
    hasSpaceVertically,
    hasSpaceDiagonally
  }
}

const getLinesByCords = (cords: [number, number], puzzleMatrix: string[][]) => {
  const [cordX, cordY] = cords
  const dimension = getDimensionFromMatrix(puzzleMatrix)

  const horizontallyLine = Array(...Array(dimension.columns).keys()).map(columnIndex => puzzleMatrix[cordX][columnIndex]).join('')
  const vertinallyLine = Array(...Array(dimension.rows).keys()).map(rownIndex => puzzleMatrix[rownIndex][cordY]).join('')
  const diagonallyDownLine = getDiagonalLineByCords(dimension, puzzleMatrix, cords)
  const diagonallyUpLine = getAntiDiagonalLineByCords(dimension, puzzleMatrix, cords)

  return {
    horizontallyLine,
    vertinallyLine,
    diagonallyDownLine,
    diagonallyUpLine
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
  getLinesByCords,
  splitsGroupOfSpacesAndLetter,
  putWord
}