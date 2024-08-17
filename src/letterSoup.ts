import { checkIntersections, generateMatrix, getCordsByMatrix, getIntersections, getLinesByCords, getRegexByLines, getWordsByRegexLines, hasSpaceInPuzzle, Line, Match, orientationType, putWord, scrambleCordsOfMatrix } from "./utils/puzzleUtils"

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
  const wordList = listWordMapped.map(value => value.upperWord)
  const wordListCopy = wordList.slice()
  const maxLength = Math.max(...listWords.map(word => word.length))
  const dimension = (GapLetter + maxLength + GapLetter)
  const letterSoupPuzzle: string[][] = generateMatrix(dimension)
  const cordsPuzzle = scrambleCordsOfMatrix(getCordsByMatrix(letterSoupPuzzle))

  for (const [x, y] of cordsPuzzle) {
    const linesByCords = getLinesByCords([x, y], letterSoupPuzzle)
    const regexByLine = getRegexByLines(linesByCords)
    const wordsByLines = getWordsByRegexLines(regexByLine, wordListCopy)

    const orientation: orientationType =
      wordsByLines.matchRegexDiagonallyDownLine.length > 0 ?
        "diagonally" : wordsByLines.matchRegexVertinallyLine.length > 0 ?
          "vertically" : wordsByLines.matchRegexHorizontallyLine.length > 0 ? "horizontally" : false


    if (orientation) {
      const matchByOrientation = Match[orientation]
      const lineByOrientation = linesByCords[Line[orientation]]
      const selectedWord = wordsByLines[matchByOrientation][0]
      const intersections = getIntersections(Array.from(selectedWord), lineByOrientation)
      const intersection = checkIntersections(intersections,selectedWord, lineByOrientation)
      
      if (intersection) {
        putWord(selectedWord, letterSoupPuzzle, [x, y], orientation, (intersection.lineIndex - intersection.wordIndex))
      } else {
        putWord(selectedWord, letterSoupPuzzle, [x, y], orientation)
      }
      wordListCopy.splice(wordListCopy.indexOf(selectedWord), 1)
    }
  }

  return {
    letterSoupPuzzle,
    wordList
  }
}

export { generate }