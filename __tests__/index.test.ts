import * as letterSoup from "../src"

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

  test('should return a object when call generate function', () => {
    const {
      letterSoupPuzzle,
      wordList
    } = letterSoup.generate(wordsArray)

    // console.log(wordList)
    console.table(wordList)
    console.table(letterSoupPuzzle)
    // letterSoupPuzzle.forEach((row) => console.table(row))

    expect(letterSoupPuzzle).toBeDefined()
    expect(wordList).toBeDefined()

  })
})