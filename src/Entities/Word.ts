import { orientationType, wordListByLineType } from "../Types"
import { Cord } from "./Cords"
import Matrix from "./Matrix"

const LETTERS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'

export default class Words {
  private matrix: Matrix
  private listOfWords: string[]

  constructor(matrix: Matrix, listOfWords: string[]) {
    this.matrix = matrix
    this.listOfWords = listOfWords.slice()
  }

  removeWord = (word: string) => {
    this.listOfWords.splice(this.listOfWords.indexOf(word), 1)
  }

  private putWordHorizontally = (word: string, padStart: number = 0) => {
    const { width } = this.matrix.dimension.getDimension()

    const { cordX } = this.matrix.cords.getCordPosition()
    let wordIndex = 0
    for (let horizontalIndex = 0; horizontalIndex < width; horizontalIndex++) {
      if (horizontalIndex >= padStart && wordIndex < word.length) {
        this.matrix.setSlot(cordX, horizontalIndex, word.charAt(wordIndex))
        wordIndex++
      }
    }
  }

  private putWordVertically = (word: string, padStart: number = 0) => {
    const { height } = this.matrix.dimension.getDimension()

    const { cordY } = this.matrix.cords.getCordPosition()
    let wordIndex = 0
    for (let verticalIndex = 0; verticalIndex < height; verticalIndex++) {
      if (verticalIndex >= padStart && wordIndex < word.length) {
        this.matrix.setSlot(verticalIndex, cordY, word.charAt(wordIndex))
        wordIndex++
      }
    }
  }

  private putWordDiagonally = (word: string, padStart: number = 0) => {
    const { height, width } = this.matrix.dimension.getDimension()
    const { cordX, cordY } = this.matrix.cords.getCordPosition()

    let wordIndex = 0
    let spaceToStart = padStart
    for (let i = Math.max(0, cordX - cordY); i < Math.min(height, height + cordX - cordY); i++) {
      const j = i - (cordX - cordY);
      if (0 <= j && j < width) {
        if (spaceToStart > 0) {
          spaceToStart--
          continue
        }
        this.matrix.setSlot(i, j, wordIndex < word.length ? word.charAt(wordIndex) : this.matrix.getSlot(i, j))
        wordIndex++
      }
    }
  }

  private putWordAntiDiagonally = (word: string, padStart: number = 0) => {
    const { height, width } = this.matrix.dimension.getDimension()
    const { cordX, cordY } = this.matrix.cords.getCordPosition()

    let wordIndex = 0
    let spaceToStart = padStart
    for (let x = Math.max(0, cordX + cordY - width + 1); x < Math.min(height, cordX + cordY + 1); x++) {
      const y = cordX + cordY - x;
      if (0 <= y && y < width) {
        if (spaceToStart > 0) {
          spaceToStart--
          continue
        }
        this.matrix.setSlot(x, y, wordIndex < word.length ? word.charAt(wordIndex) : this.matrix.getSlot(x, y))
        wordIndex++
      }
    }
  }

  putWord = (word: string, orientation: orientationType, padStart: number = 0) => {
    switch (orientation) {
      case "diagonally":
        this.putWordDiagonally(word, padStart)
        break;
      case "vertically":
        this.putWordVertically(word, padStart)
        break;
      case "horizontally":
        this.putWordHorizontally(word, padStart)
        break;
      case "antidiagonally":
        this.putWordAntiDiagonally(word, padStart)
        break;
    }
  }

  getWordsEveryOrientation = (): wordListByLineType => {
    const linesWithSearhRegex = this.matrix.lines.getLinesWithRegex()

    const wordsByLine = Object.keys(linesWithSearhRegex).reduce((result, key) => {
      const newObj = {} as any
      newObj[`match${key.capitalize()}`] = this.listOfWords.filter(word => word.match(linesWithSearhRegex[key as keyof typeof linesWithSearhRegex]) as string[])
      return {
        ...result,
        ...newObj
      }
    }, {} as wordListByLineType)

    return wordsByLine
  }
}