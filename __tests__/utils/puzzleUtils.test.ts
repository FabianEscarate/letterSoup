import { checkIntersections, generateMatrix, getIntersections, getLinesByCords, getRegexByLines, getWordsByRegexLines, hasSpaceInPuzzle } from "../../src/utils/puzzleUtils"

describe('letterSoup generator', () => {

  test('should return a matrix with specific dimension', () => {
    const expectDimension = 5

    const matrix = generateMatrix(expectDimension)
    expect(matrix.length).toBe(5)
    expect(matrix[3].length).toBe(5)
  })

  test('should return all lines by especific cords', () => {
    const matrixExample: string[][] = [
      [' ', 'c', ' ', 'c', ' '],
      [' ', ' ', 'r', 'a', 'r'],
      ['f', 'l', 'u', 'i', 'r'],
      [' ', ' ', 'u', 'd', 'e'],
      [' ', 'h', ' ', 'a', ' ']
    ]

    const {
      horizontallyLine,
      vertinallyLine,
      diagonallyDownLine,
      diagonallyUpLine
    } = getLinesByCords([2, 3], matrixExample)

    expect(horizontallyLine).toBe('fluir')
    expect(vertinallyLine).toBe('caida')
    expect(diagonallyDownLine).toBe('crie')
    expect(diagonallyUpLine).toBe('huir')
  })

  test('should return regular expresion for every line', () => {
    // getLinesCords (2,1)
    // [' ', 'V', ' ', 'Z', ' '],
    // [' ', ' ', ' ', ' ', ' '],
    // ['F', ' ', ' ', ' ', ' '],
    // [' ', ' ', 'I', ' ', ' '],
    // [' ', ' ', ' ', ' ', ' ']


    const {
      regexHorizontallyLine,
      regexVertinallyLine,
      regexDiagonallyDownLine,
      regexDiagonallyUpLine
    } = getRegexByLines({
      horizontallyLine: 'F    ',
      vertinallyLine: 'V    ',
      diagonallyDownLine: '  I ',
      diagonallyUpLine: '   Z'
    })

    expect(regexHorizontallyLine.toString()).toBe('/(^F.{1,4}$)|(^F.{1,4}$)/gm')
    expect(regexVertinallyLine.toString()).toBe('/(^V.{1,4}$)|(^V.{1,4}$)/gm')
    expect(regexDiagonallyDownLine.toString()).toBe('/(^.{1,2}I.{1,1}$)|(^.{1,2}I.{1,1}$)/gm')
    expect(regexDiagonallyUpLine.toString()).toBe('/(^.{1,3}Z$)|(^.{1,3}Z$)/gm')
  })

  test('should return list of words was matched by regex definition', () => {
    // getLinesCords (2,1)
    // [' ', 'V', ' ', 'X', ' '],
    // [' ', ' ', ' ', ' ', ' '],
    // ['F', ' ', ' ', ' ', ' '],
    // [' ', ' ', 'I', ' ', ' '],
    // [' ', ' ', ' ', ' ', ' ']

    const listofWords = [
      "PASTO",
      "FALTA",
      "SIBYL",
      "LOURS",
      "TRIPA",
      "ALTAS",
      "CISNE",
      "WHID",
      "CALX",
      "GOER",
      "RATA",
      "OLOR",
      "CHIR",
      "ALAS",
    ]

    const {
      matchRegexHorizontallyLine,
      matchRegexVertinallyLine,
      matchRegexDiagonallyDownLine,
      matchRegexDiagonallyUpLine
    } = getWordsByRegexLines({
      regexHorizontallyLine: /(^F.{1,4}$)|(^F.{1,4}$)/gm,
      regexVertinallyLine: /(^V.{1,4}$)|(^V.{1,4}$)/gm,
      regexDiagonallyDownLine: /(^.{1,2}I.{1,1}$)|(^.{1,2}I.{1,1}$)/gm,
      regexDiagonallyUpLine: /(^.{1,3}Z$)|(^.{1,3}X$)/gm
    }, listofWords)

    expect(matchRegexHorizontallyLine).toEqual(["FALTA"])
    expect(matchRegexVertinallyLine).toEqual([])
    expect(matchRegexDiagonallyDownLine).toEqual(["WHID", "CHIR"])
    expect(matchRegexDiagonallyUpLine).toEqual(["CALX"])

  })

  test('should return list of intersections for be evaluated', () => {
    const word = "ALFARERO"
    const testLine = 'RER  I  A    R   '

    const intersections = getIntersections(Array.from(word), testLine)

    expect(intersections).toHaveLength(9)
  })

  test('should return the correct intersection for the word to line', () => {
    const intersections = [
      { wordIndex: 1, lineIndex: 16 }, // false -> fuera de rango line
      { wordIndex: 2, lineIndex: 2 }, // true -
      { wordIndex: 4, lineIndex: 16 }, // false -> fuera de rango line
      { wordIndex: 9, lineIndex: 11 } // false -> altera una palabra
    ]
    const word = "ENCANTADOR"
    const testLine = '  C        R U  N'
    const intersectionExpected = { wordIndex: 2, lineIndex: 2 }

    const correctIntersection = checkIntersections(intersections, word, testLine)

    expect(correctIntersection).toEqual(intersectionExpected)
  })
})