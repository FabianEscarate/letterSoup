import { orientationType, wordListByLineType } from "../Types"
import { Cordenate } from "./Cordenates"
import CrossRow from "./CrossRow"
import PlayBoard from "./PlayBoard"

const LETTERS = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'

export default class Words {
  private board: PlayBoard
  private listOfWords: string[]

  constructor(_board: PlayBoard, listOfWords: string[]) {
    this.board = _board
    this.listOfWords = listOfWords.slice()
  }

  listWords = () => {
    return this.listOfWords
  }

  hasMoreWordsToPut = () => {
    return this.listOfWords.length > 0
  }

  removeWord = (word: string) => {
    this.listOfWords.splice(this.listOfWords.indexOf(word), 1)
  }

  putWordByRowCordenates = (word: string, rowCordenates: Cordenate[], padStart: number = 0) => {
    let wordIndex = 0
    rowCordenates.forEach((cordenate, rowIndex) => {
      if(rowIndex >= padStart && wordIndex < word.length){
        this.board.setSlot(cordenate.cordX, cordenate.cordY, word.charAt(wordIndex))
        wordIndex++
      }
    })
  }

  getPossibleWordsByLines = (lines: CrossRow): wordListByLineType => {
    const linesWithSearhRegex = lines.getLinesWithRegex()

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