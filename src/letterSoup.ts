import { Cordenate } from "./Entities/Cordenates"
import CrossRow from "./Entities/CrossRow"
import PlayBoard from "./Entities/PlayBoard"
import Words from "./Entities/Word"
import { interectionsType, matchRegexLines, wordListByLineType } from "./Types"
import { generateRegexByLine } from "./utils/regex"

export class LetterSoup {
  private listOfWord: string[]
  private playBoard: PlayBoard
  private words: Words

  constructor(listOfWords: string[]) {
    this.listOfWord = listOfWords.map(word => word.toUpperCase())
    const maxWordLegth = Math.max(...listOfWords.map(word => word.length))
    this.playBoard = new PlayBoard(maxWordLegth)
    this.words = new Words(this.playBoard, this.listOfWord)

    this.generate()
  }

  private generate() {
    const scrambleCordenates = this.playBoard.cordenates.scrambleCordsOfMatrix()

    // first try
    for (const currentCordenate of scrambleCordenates) {
      this.tryPutWords(currentCordenate)
    }

    // if has no more words in the list
    // if (!this.words.hasMoreWordsToPut()) return

    // second try (check empty espaces)
    // const cordsWithEmptyValues = this.playBoard.cordenates.getEmptySlots()

    // for (const cordEmpty of cordsWithEmptyValues) {
    //   // console.log(cordEmpty)
    //   this.tryPutWords(cordEmpty)
    // }


    // let numberOfTry = 1
    // while(numberOfTry <= NUMBER_OF_TRY){
    //   numberOfTry++
    // }



    console.table(this.words.listWords())
  }

  private tryPutWords = (cord: Cordenate) => {
    const crossRows = new CrossRow(this.playBoard, cord)
    const canPutWord = this.canPutWordByCrossRow(crossRows)

    if (canPutWord) {
      const {
        orientation,
        wordSelected
      } = this.selectAnyMatch(canPutWord)

      const lineCordenates = this.playBoard.cordenates.getCordsByOrientationAndCordenate(orientation, cord)
      const orientedRow = lineCordenates.map(cord => this.playBoard.getSlot(cord.cordX, cord.cordY)).join('')
      const intersections = this.getIntersections(wordSelected, orientedRow)
      const intersection = this.checkIntersections(intersections, wordSelected, orientedRow)

      if (intersection) {
        this.words.putWordByRowCordenates(wordSelected, lineCordenates, (intersection.lineIndex - intersection.wordIndex))
      } else {
        this.words.putWordByRowCordenates(wordSelected, lineCordenates)
      }
      this.words.removeWord(wordSelected)
    }
  }

  private canPutWordByCrossRow = (crossRows: CrossRow) => {
    const wordsForEveryOrientation = this.words.getPossibleWordsByLines(crossRows)
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

    return {
      orientation: matchRegexLines[randomSelection],
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
      // console.warn('have more of one intersection')
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

  getPuzzle = () => this.playBoard.getPlayBoard()

  getWords = () => this.listOfWord
}

