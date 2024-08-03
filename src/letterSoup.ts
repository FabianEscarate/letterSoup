import { generateMatrix, getCordsByMatrix, hasSpaceInPuzzle, orientationType, putWord } from "./utils/puzzleUtils"

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

const randomCords = (matrixDimension: number): [number, number] => {
  return [
    Math.floor(Math.random() * matrixDimension),
    Math.floor(Math.random() * matrixDimension)
  ]
}

const generate = (listWords: recieveListWordsType): resultGenerateType => {
  const listWordMapped = listWords.map(getLengthAndUpperWord)
  const maxLength = Math.max(...listWords.map(word => word.length))
  const dimension = (GapLetter + maxLength + GapLetter)
  const letterSoupPuzzle: string[][] = generateMatrix(dimension)
  const cordsPuzzle = getCordsByMatrix(letterSoupPuzzle)

  for (const selectedWord of listWordMapped) {
    if (!selectedWord)
      throw 'no more words';

    let [x, y] = [0, 0]
    while ([x, y] = randomCords(dimension)) {
      const orientationPosibility = hasSpaceInPuzzle(dimension, [x, y], selectedWord.lengthWord, letterSoupPuzzle)
      const orientation: orientationType =
        orientationPosibility.hasSpaceDiagonally ?
          "diagonally" : orientationPosibility.hasSpaceVertically ?
            "vertically" : orientationPosibility.hasSpaceHorizontally ? "horizontally" : false

      if (orientation) {
        putWord(selectedWord.upperWord, letterSoupPuzzle, [x, y], orientation)
        console.table(letterSoupPuzzle)
        // console.log({selectedWord, cords:[x,y], orientation, letterSoupPuzzle})
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