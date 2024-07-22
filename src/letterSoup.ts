import { hasSpaceInPuzzle } from "./utils/puzzleUtils"

type recieveListWordsType = string[]
type resultGenerateType = {
  letterSoupPuzzle: Array<string[]>,
  wordList: string[]
}
type mapWord = {
  upperWord: string,
  lengthWord: number
}

const UpperLetters = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
const GapLetter = 1
const getLengthAndUpperWord = (word: string): mapWord => ({
  upperWord: word.toUpperCase(),
  lengthWord: word.length
})


const generate = (listWords: recieveListWordsType): resultGenerateType => {
  const listWordMapped = listWords.map(getLengthAndUpperWord)
  const maxLength = listWords.sort((a, b) => b.length - a.length)[0].length
  const dimension = (GapLetter + maxLength + GapLetter)
  const letterSoupPuzzle: string[][] = [[]]
  console.table(listWordMapped)

  while (listWordMapped.length < 0) {
    const selectedWord = listWordMapped.pop()
    for (let x = 0; x <= dimension; x++) {
      for (let y = 0; y <= dimension; y++) {

      }
    }
  }

  return {
    letterSoupPuzzle,
    wordList: listWordMapped.map(value => value.upperWord)
  }
}

export { generate }