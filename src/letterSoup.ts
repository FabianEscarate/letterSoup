import { Cord } from "./Entities/Cords"
import Lines from "./Entities/Lines"
import Matrix from "./Entities/Matrix"
import Words from "./Entities/Word"
import { interectionsType, matchRegexLines, wordListByLineType } from "./Types"
import { generateRegexByLine } from "./utils/regex"

type recieveListWordsType = string[]
type resultGenerateType = {
  letterSoupPuzzle: Array<string[]>,
  wordList: string[]
}

export class WordSearch {
  private listOfWord: string[]
  private puzzle: Matrix
  private words: Words

  constructor(listOfWords: string[]) {
    this.listOfWord = listOfWords.map(word => word.toUpperCase())
    const maxWordLegth = Math.max(...listOfWords.map(word => word.length))
    this.puzzle = new Matrix(maxWordLegth)
    this.words = new Words(this.puzzle, this.listOfWord)

    this.generate()
  }

  private generate() {
    const cordsPuzzle = this.puzzle.cords.scrambleCordsOfMatrix()

    for (const cord of cordsPuzzle) {
      const canPutWord = this.canPutWordInCurrentPosition(cord)

      if (canPutWord) {
        const {
          orientation,
          line,
          wordSelected
        } = this.selectAnyMatch(canPutWord)

        console.table({
          orientation,
          line,
          wordSelected
        })

        const intersections = this.getIntersections(wordSelected, line)
        const intersection = this.checkIntersections(intersections, wordSelected, line)

        if (intersection) {
          this.words.putWord(wordSelected, orientation, (intersection.lineIndex - intersection.wordIndex))
        } else {
          this.words.putWord(wordSelected, orientation)
        }
        console.table(this.puzzle.getMatrix())
        this.words.removeWord(wordSelected)
      }
    }
  }

  private canPutWordInCurrentPosition = (cord: Cord) => {   
    this.puzzle.cords.setCordPosition(cord)
    const wordsForEveryOrientation = this.words.getWordsEveryOrientation()
    const {
      matchRegexDiagonallyDownLine,
      matchRegexDiagonallyUpLine,
      matchRegexHorizontallyLine,
      matchRegexVerticallyLine
    } = wordsForEveryOrientation
    const canPutWord = [
      matchRegexDiagonallyDownLine.length > 0,
      matchRegexDiagonallyUpLine.length > 0,
      matchRegexHorizontallyLine.length > 0,
      matchRegexVerticallyLine.length > 0
    ].some(Boolean)

    if (!canPutWord) return false
    return wordsForEveryOrientation
  }

  private pickRandomElement = <T>(listOfElements: T[]): T => {
    return listOfElements[Math.floor(Math.random() * listOfElements.length)]
  }

  private selectAnyMatch = (lineMatches: wordListByLineType) => {
    const matchKeyToScramble = Object.keys(lineMatches)
      .filter(
        keyLineMatch => lineMatches[keyLineMatch as keyof wordListByLineType].length > 0
      )

    const randomSelection = this.pickRandomElement(matchKeyToScramble) as keyof wordListByLineType

      console.log({
        lineMatches,randomSelection
      })

    return {
      orientation: matchRegexLines[randomSelection],
      line: this.puzzle.lines.getLineByOrientation(matchRegexLines[randomSelection]),
      wordSelected: this.pickRandomElement(lineMatches[randomSelection]),
    }
  }

  private getIntersections = (word: string, line: string): interectionsType => {
    const listOfIntersections = [] as interectionsType
    Array.from(word).forEach((wordLetter, wordIndex) => {
      Array.from(line).forEach((lineLetter, lineIndex) => {
        if (wordLetter === lineLetter)
          listOfIntersections.push({
            lineIndex,
            wordIndex
          })
      })
    })

    return listOfIntersections
  }

  private checkIntersections = (intersections: interectionsType, word: string, line: string) => {

    if (intersections.length === 1)
      return intersections[0]
    if (intersections.length > 1) {
      console.warn('have more of one intersection')
      const lengthLine = line.length
      const lengthWord = word.length

      return intersections.filter(intersection => {
        const diffIntersection = (intersection.lineIndex - intersection.wordIndex)

        if ((diffIntersection + lengthWord) > lengthLine || diffIntersection < 0) {
          return false
        }
        const subStrLine = line.substring(diffIntersection, (diffIntersection + lengthWord))
        const regex = generateRegexByLine(subStrLine)
        if (!regex.test(word)) {
          return false
        }
        return true
      })[0]
    }
  }

  getPuzzle = () => this.puzzle.getMatrix()

  getWords = () => this.listOfWord
}

