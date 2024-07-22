import { hasSpaceInPuzzle } from "../../src/utils/puzzleUtils"

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

  test('should validate if have space in the matrix', () => {
    const randomIndex = Math.floor(Math.random() * wordsArray.length)
    const randomWord = wordsArray[randomIndex]
    const dimension = 17
    const randomCords: [number, number] = [
      Math.floor(Math.random() * wordsArray.length),
      Math.floor(Math.random() * wordsArray.length)
    ]
    console.log([randomWord, randomWord.length], dimension, randomCords)

    const hasSpace = hasSpaceInPuzzle(dimension, randomCords, randomWord.length)

    console.log(hasSpace)

    expect(hasSpace).toBeDefined()
  })
})