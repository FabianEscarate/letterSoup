import { orientationEnum, orientationType, regexValueByLineType } from "../Types";
import { generateRegexByLine } from "../utils/regex";
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
      const newObj = {} as any
      newObj[`regex${key.capitalize()}`] = generateRegexByLine(lines[key as keyof typeof lines])
      return {
        ...result,
        ...newObj
      }
    }, {} as regexValueByLineType)

    return regexForLines
  }

  getLineByOrientation = (orientation: orientationType) => {
    let selectedOrientation:Cordenate[]
    switch (orientation) {
      case "horizontally":
        selectedOrientation =  this.horizontallyRowCordenates
      case "vertically":
        selectedOrientation =  this.verticallyRowCordenates
      case "diagonally":
        selectedOrientation =  this.diagonallyDownRowCordenates
      case "antidiagonally":
        selectedOrientation =  this.diagonallyUpRowCordenates
    }

    return selectedOrientation.map(cord => this.board.getSlot(cord.cordX, cord.cordY)).join('')
  }
}
