import { orientationEnum, orientationType, regexValueByLineType } from "../Types";
import { generateRegexByLine } from "../utils/regex";
import '../utils/string'
import { Cordenate } from "./Cordenates";
import PlayBoard from "./PlayBoard";

export default class CrossRow {
  private board: PlayBoard
  private horizontallyRowCordenates: Cordenate[]
  private verticallyRowCordenates: Cordenate[]
  private diagonallyDownRowCordenates: Cordenate[]
  private diagonallyUpRowCordenates: Cordenate[]

  constructor(_board: PlayBoard, currentPosition: Cordenate) {
    const {
      cordenates: { getCordsByOrientationAndCordenate },
    } = _board

    this.board = _board

    this.horizontallyRowCordenates = getCordsByOrientationAndCordenate(orientationEnum.horizontally, currentPosition)
    this.verticallyRowCordenates = getCordsByOrientationAndCordenate(orientationEnum.vertically, currentPosition)
    this.diagonallyDownRowCordenates = getCordsByOrientationAndCordenate(orientationEnum.diagonally, currentPosition)
    this.diagonallyUpRowCordenates = getCordsByOrientationAndCordenate(orientationEnum.antidiagonally, currentPosition)
  }

  getLinesWithRegex = (): regexValueByLineType => {
    const lines = {
      horizontallyLine: this.horizontallyRowCordenates.map(cord => this.board.getSlot(cord.cordX, cord.cordY)).join(''),
      verticallyLine: this.verticallyRowCordenates.map(cord => this.board.getSlot(cord.cordX, cord.cordY)).join(''),
      diagonallyDownLine: this.diagonallyDownRowCordenates.map(cord => this.board.getSlot(cord.cordX, cord.cordY)).join(''),
      diagonallyUpLine: this.diagonallyUpRowCordenates.map(cord => this.board.getSlot(cord.cordX, cord.cordY)).join('')
    }

    const regexForLines = Object.keys(lines).reduce((result, key) => {
      result[`regex${key.capitalize()}`] = generateRegexByLine(lines[key as keyof typeof lines])
      return result
    }, {} as Record<string, RegExp>) as regexValueByLineType

    return regexForLines
  }

  getLineByOrientation = (orientation: orientationType) => {
    const rowCordenatesByOrientation = {
      horizontally: this.horizontallyRowCordenates,
      vertically: this.verticallyRowCordenates,
      diagonally: this.diagonallyDownRowCordenates,
      antidiagonally: this.diagonallyUpRowCordenates
    }

    return rowCordenatesByOrientation[orientation].map(cord => this.board.getSlot(cord.cordX, cord.cordY)).join('')
  }
}
