import { WordSearch } from "../src"

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
    } = new WordSearch(wordsArray)

    const listOfWord = getWords()
    const puzzle = getPuzzle()

    expect(puzzle).toBeDefined()
    expect(listOfWord).toBeDefined()

  })
})