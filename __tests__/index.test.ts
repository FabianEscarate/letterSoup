import { LetterSoup } from "../src"

describe('letterSoup generator', () => {

  const wordsArray = [
    "tarjetas",
    "Weaselling",
    "Pinwales",
    "populoso",
    "participio",
    "Cuddliest",
    "Especias",
    "teléfonos",
    "epigráfico",
    "hidrométrico",
    "licitador",
    "partición",
    "miembros",
    "nuestra",
    "restituciones"
  ]

  test('should return a object when call generate function', () => {
    const {
      getPuzzle,
      getWords
    } = new LetterSoup(wordsArray)

    const listOfWord = getWords()
    const puzzle = getPuzzle()

    // console.table(listOfWord)
    console.table(puzzle)

    expect(puzzle).toBeDefined()
    expect(listOfWord).toBeDefined()

  })
})