import { generateMatrix, generateRegexByGroupOfSpacesAndLetters, getLinesByCords, hasSpaceInPuzzle, splitsGroupOfSpacesAndLetter } from "../../src/utils/puzzleUtils"

describe('letterSoup generator', () => {

  const wordsArray = [
    "recrimación",
    "descompuestos",
    "containerizzato",
    "curaciones",
    "decorada",
    "chimeneas",
    "Firetraps",
    "molinos",
    "alfarero",
    "encantador",
    "tecnócrata",
    "poliedros",
    "adivinanzas",
    "imparcialidad",
    "fluir"
  ]

  test.skip('should validate if word have space in the matrix', () => {
    const selectedWord = 'FLUIR'
    const dimension = 5
    const randomCords: [number, number] = [
      Math.floor(Math.random() * 5),
      Math.floor(Math.random() * 5)
    ]
    const matrixStub: string[][] = [
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' '],
      ['f', 'l', 'u', 'i', 'r'],
      [' ', ' ', ' ', ' ', ' '],
      [' ', ' ', ' ', ' ', ' ']
    ]

    const hasSpace = hasSpaceInPuzzle(dimension, randomCords, selectedWord.length, matrixStub)

    console.log({
      word: selectedWord,
      wordLength: selectedWord.length,
      dimension,
      matrixStub,
      randomCords,
      hasSpace
    })

    expect(hasSpace).toBeDefined()
  })

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




})