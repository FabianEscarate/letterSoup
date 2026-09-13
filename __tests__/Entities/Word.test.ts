import Words from "../../src/Entities/Word"
import PlayBoard from "../../src/Entities/PlayBoard"

describe('Words Suite', () => {
  describe('Generate Instance', () => {
    test('Should generate Instance', () => {
      const wordsInstance = new Words(new PlayBoard(1), [])

      expect(wordsInstance).toBeDefined()
    })
  })

  describe('Methods testing', () => {
    const board = new PlayBoard(1)
    const words = ['HELLO', 'WORLD']
    let wordsInstance: Words

    beforeAll(() => {
      wordsInstance = new Words(board, words)
    })

    test('Should get list of words', () => {
      const wordList = wordsInstance.listWords()
      expect(wordList).toEqual(words)
    })

    test('Should has more words to put', () => {
      const hasMoreWords = wordsInstance.hasMoreWordsToPut()
      expect(hasMoreWords).toBeTruthy()
    })

    test('Should remove word', () => {
      wordsInstance.removeWord('HELLO')
      const wordList = wordsInstance.listWords()
      expect(wordList).toEqual(['WORLD'])
    })

    test('Should get remaining words not placed yet', () => {
      const remainingWords = wordsInstance.getRemainingWords()

      expect(remainingWords).toEqual(['WORLD'])
    })
  })
})
