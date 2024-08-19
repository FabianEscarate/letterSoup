import { orientationEnum, orientationType, regexValueByLineType } from "../Types";
import { generateRegexByLine } from "../utils/regex";
import Matrix from "./Matrix";

export default class Lines {
  horizontallyLine: string = ''
  verticallyLine: string = ''
  diagonallyDownLine: string = ''
  diagonallyUpLine: string = ''

  constructor(matrix?: Matrix) {
    if (!matrix)
      return

    const {
      cords: { getCordsFromCurrentPositionByOrientation },
      getSlot
    } = matrix

    this.horizontallyLine = getCordsFromCurrentPositionByOrientation(orientationEnum.horizontally).map(cord => getSlot(cord.cordX, cord.cordY)).join('')
    this.verticallyLine = getCordsFromCurrentPositionByOrientation(orientationEnum.vertically).map(cord => getSlot(cord.cordX, cord.cordY)).join('')
    this.diagonallyDownLine = getCordsFromCurrentPositionByOrientation(orientationEnum.diagonally).map(cord => getSlot(cord.cordX, cord.cordY)).join('')
    this.diagonallyUpLine = getCordsFromCurrentPositionByOrientation(orientationEnum.antidiagonally).map(cord => getSlot(cord.cordX, cord.cordY)).join('')
  }

  getLinesWithRegex = (): regexValueByLineType => {
    const lines = {
      horizontallyLine: this.horizontallyLine,
      verticallyLine: this.verticallyLine,
      diagonallyDownLine: this.diagonallyDownLine,
      diagonallyUpLine: this.diagonallyUpLine
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
    switch (orientation) {
      case "horizontally":
        return this.horizontallyLine
      case "vertically":
        return this.verticallyLine
      case "diagonally":
        return this.diagonallyDownLine
      case "antidiagonally":
        return this.diagonallyUpLine

    }
  }
}