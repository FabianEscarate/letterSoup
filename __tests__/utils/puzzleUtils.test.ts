import { generateMatrix, hasAnotherWords, hasSpaceInPuzzle } from "../../src/utils/puzzleUtils"

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

  test('should validate if word have space in the matrix', () => {
    const randomIndex = Math.floor(Math.random() * wordsArray.length)
    const randomWord = wordsArray[randomIndex]
    const dimension = 17
    const randomCords: [number, number] = [
      Math.floor(Math.random() * wordsArray.length),
      Math.floor(Math.random() * wordsArray.length)
    ]

    const hasSpace = hasSpaceInPuzzle(dimension, randomCords, randomWord.length)

    console.log({
      word: randomWord,
      wordLength: randomWord.length,
      dimension,
      randomCords,
      hasSpace
    })

    expect(hasSpace).toBeDefined()
  })

  test('should validate if word has another word colisionaned', () => {
    const selectedWord = 'words'
    const randomCords: [number, number] = [
      Math.floor(Math.random() * 5),
      Math.floor(Math.random() * 5)
    ]

    const matrixStub: string[][] = [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['f', 'l', 'u', 'i', 'r'],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ]

    const hasAnotherWordsResult = hasAnotherWords(matrixStub, randomCords, 5)

    console.log({
      word: selectedWord,
      wordLength: selectedWord.length,
      matrixStub,
      randomCords,
      hasAnotherWordsResult
    })

    expect(hasAnotherWordsResult).toBeDefined()
  })

  test('should return a matrix with specific dimension', () => {
    const expectDimension = 5

    const matrix = generateMatrix(expectDimension)
    console.table(matrix)
    expect(matrix.length).toBe(5)
    expect(matrix[3].length).toBe(5)
  })
})