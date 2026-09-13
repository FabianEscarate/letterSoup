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
      getWords,
      getRemainingWords
    } = new LetterSoup(wordsArray)

    const listOfWord = getWords()
    const puzzle = getPuzzle()
    const remainingWords = getRemainingWords()

    expect(puzzle).toBeDefined()
    expect(listOfWord).toBeDefined()
    expect(remainingWords).toEqual([])
  })
})