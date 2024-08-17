import { generateRegexByGroupOfSpacesAndLetters, hasAnotherLetters, splitsGroupOfSpacesAndLetter } from "./regex"
import './string'

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
export type orientationType = "horizontally" | "vertically" | "diagonally" | "antidiagonally" | false

export enum Line {
  horizontally = "horizontallyLine",
  vertically = "vertinallyLine",
  diagonally = "diagonallyDownLine",
  antidiagonally = "diagonallyUpLine"
}

export enum Match {
  horizontally = "matchRegexHorizontallyLine",
  vertically = "matchRegexVertinallyLine",
  diagonally = "matchRegexDiagonallyDownLine",
  antidiagonally = "matchRegexDiagonallyUpLine"
}

type linesByCordsType = {
  horizontallyLine: string;
  vertinallyLine: string;
  diagonallyDownLine: string;
  diagonallyUpLine: string;
}

type regexValueByLine<Type> = {
  [key in keyof Type as `regex${Capitalize<string & key>}`]: RegExp
}

type regexValueByLineType = regexValueByLine<linesByCordsType>

type wordListByLine<Type> = {
  [key in keyof Type as `match${Capitalize<string & key>}`]: string[]
}

type wordListByLineType = wordListByLine<regexValueByLineType>

type interectionType = {
  wordIndex: number,
  lineIndex: number
}

type interectionsType = interectionType[]

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

const scrambleCordsOfMatrix = (cords: number[][]) => {
  let scrambleCords = []
  const cordsCopy = cords.slice()
  while (cordsCopy.length > 0) {
    scrambleCords.push(cordsCopy.splice(Math.floor(Math.random() * cordsCopy.length), 1)[0])
  }
  return scrambleCords
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

  const hasSpaceHorizontally = diffHorizontally >= lengthOfWord && !hasAnotherLetters(puzzleRow)
  const hasSpaceVertically = diffVertically >= lengthOfWord && !hasAnotherLetters(puzzleColumn)
  const hasSpaceDiagonally = puzzleDiagonal.length >= lengthOfWord && !hasAnotherLetters(puzzleDiagonal)

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

const getRegexByLines = (lines: linesByCordsType): regexValueByLineType => {
  return Object.keys(lines).reduce((result, key) => {
    const newObj = {} as any
    newObj[`regex${key.capitalize()}`] = generateRegexByGroupOfSpacesAndLetters(splitsGroupOfSpacesAndLetter(lines[key as keyof linesByCordsType]))
    return {
      ...result,
      ...newObj
    }
  }, {} as regexValueByLineType)
}

const getWordsByRegexLines = (regexLines: regexValueByLineType, wordList: string[]): wordListByLineType => {
  return Object.keys(regexLines).reduce((result, key) => {
    const newObj = {} as any
    newObj[`match${key.capitalize()}`] = wordList.filter(word => word.match(regexLines[key as keyof regexValueByLineType]) as string[])
    return {
      ...result,
      ...newObj
    }
  }, {} as wordListByLineType)
}

const getIntersections = (word: string[], line: string): interectionsType => {
  const listOfIntersections = [] as interectionsType
  word.forEach((wordLetter, wordIndex) => {
    Array.from(line).forEach((lineLetter, lineIndex) => {
      if (wordLetter === lineLetter)
        listOfIntersections.push({
          lineIndex,
          wordIndex
        })
    })
  })

  return listOfIntersections
}

const checkIntersections = (intersections: interectionsType, word: string, line: string) => {

  if (intersections.length === 1)
    return intersections[0]
  if (intersections.length > 1) {
    console.warn('have more of one intersection')
    const lengthLine = line.length
    const lengthWord = word.length

    return intersections.filter(intersection => {
      const diffIntersection = (intersection.lineIndex - intersection.wordIndex)

      if ((diffIntersection + lengthWord) > lengthLine || diffIntersection < 0) {
        return false
      }
      const subStrLine = line.substring(diffIntersection, (diffIntersection + lengthWord))
      const regex = generateRegexByGroupOfSpacesAndLetters(splitsGroupOfSpacesAndLetter(subStrLine))
      if (!regex.test(word)) {
        return false
      }
      return true
    })[0]
  }
}

const putWordHorizontally = (word: string, currentPosition: [number, number], matrix: string[][], padStart: number = 0) => {
  const { rows, columns } = getDimensionFromMatrix(matrix)

  const [X, Y] = currentPosition
  let wordIndex = 0
  for (let horizontalIndex = 0; horizontalIndex < columns; horizontalIndex++) {
    if (horizontalIndex >= padStart) {
      matrix[X][horizontalIndex] = wordIndex < word.length ? word.charAt(wordIndex) : matrix[X][horizontalIndex]
      wordIndex++
    }
  }
}

const putWordVertically = (word: string, currentPosition: [number, number], matrix: string[][], padStart: number = 0) => {
  const { rows, columns } = getDimensionFromMatrix(matrix)

  const [X, Y] = currentPosition
  let wordIndex = 0
  for (let verticalIndex = 0; verticalIndex < rows; verticalIndex++) {
    if (verticalIndex >= padStart) {
      matrix[verticalIndex][Y] = wordIndex < word.length ? word.charAt(wordIndex) : matrix[verticalIndex][Y]
      wordIndex++
    }
  }
}

const putWordDiagonally = (word: string, currentPosition: [number, number], matrix: string[][], padStart?: number) => {
  const { rows, columns } = getDimensionFromMatrix(matrix)
  const [X, Y] = currentPosition

  let wordIndex = 0
  let spaceToStart = padStart ?? 0
  for (let i = Math.max(0, X - Y); i < Math.min(rows, rows + X - Y); i++) {
    const j = i - (X - Y);
    if (0 <= j && j < columns) {
      if (spaceToStart > 0) {
        spaceToStart--
        continue
      }
      matrix[i][j] = wordIndex < word.length ? word.charAt(wordIndex) : matrix[i][j]
      wordIndex++
    }
  }
}

const putWord = (word: string, matrix: string[][], currentPosition: [number, number], orientation: orientationType, padStart: number = 0) => {
  switch (orientation) {
    case "diagonally":
      putWordDiagonally(word, currentPosition, matrix, padStart)
      break;
    case "vertically":
      putWordVertically(word, currentPosition, matrix, padStart)
      break;
    case "horizontally":
      putWordHorizontally(word, currentPosition, matrix, padStart)
      break;
  }
}

export {
  scrambleCordsOfMatrix,
  hasSpaceInPuzzle,
  generateMatrix,
  getCordsByMatrix,
  getLinesByCords,
  getRegexByLines,
  getWordsByRegexLines,
  getIntersections,
  checkIntersections,
  putWord
}