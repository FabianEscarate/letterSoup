import { generateMatrix, getCordsByMatrix, hasSpaceInPuzzle, orientationType, putWord, scrambleCordsOfMatrix } from "./utils/puzzleUtils"

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
  const maxLength = Math.max(...listWords.map(word => word.length))
  const dimension = (GapLetter + maxLength + GapLetter)
  const letterSoupPuzzle: string[][] = generateMatrix(dimension)
  const cordsPuzzle = scrambleCordsOfMatrix(getCordsByMatrix(letterSoupPuzzle))

  for (const selectedWord of listWordMapped) {
    if (!selectedWord)
      throw 'No more words'

    for (const [x, y] of cordsPuzzle) {
      const orientationPosibility = hasSpaceInPuzzle(dimension, [x, y], selectedWord.lengthWord, letterSoupPuzzle)
      const orientation: orientationType =
        orientationPosibility.hasSpaceDiagonally ?
          "diagonally" : orientationPosibility.hasSpaceVertically ?
            "vertically" : orientationPosibility.hasSpaceHorizontally ? "horizontally" : false



      if (orientation) {
        putWord(selectedWord.upperWord, letterSoupPuzzle, [x, y], orientation)
        break
      }
    }
  }

  return {
    letterSoupPuzzle,
    wordList: listWordMapped.map(value => value.upperWord)
  }
}

export { generate }