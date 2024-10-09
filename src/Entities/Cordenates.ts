import { orientationEnum, orientationType } from "../Types"
import { DimensionType } from "./DimensionBoard"
import CrossRow from "./CrossRow"
import PlayBoard from "./PlayBoard"


export class Cordenate {
  cordX: number
  cordY: number

  constructor(cordX: number, cordY: number) {
    this.cordX = cordX
    this.cordY = cordY
  }
}

export default class Cordenates {
  private board: PlayBoard
  private allCordsOfMatrix: Cordenate[]

  constructor(_board: PlayBoard) {
    this.board = _board
    this.allCordsOfMatrix = this.getAllCordsOfMatrix(_board.getDimension())
  }

  private getAllCordsOfMatrix = (dimensionMatrix: DimensionType) => {
    const {
      width,
      height
    } = dimensionMatrix

    const result = []

    for (let x = 0; x < height; x++)
      for (let y = 0; y < width; y++)
        result.push(new Cordenate(x, y))

    return result
  }

  scrambleCordsOfMatrix = () => {
    let scrambleCords = []
    const cordsOfMatrix = this.allCordsOfMatrix.slice()
    while (cordsOfMatrix.length > 0) {
      scrambleCords.push(cordsOfMatrix.splice(Math.floor(Math.random() * cordsOfMatrix.length), 1)[0])
    }
    return scrambleCords
  }

  getEmptySlots = () => {
    return this.allCordsOfMatrix.slice().filter((cord) => this.board.getPlayBoard()[cord.cordX][cord.cordY] === ' ')
  }

  private getHorizontalCordsByCordenate = (cordenate: Cordenate): Cordenate[] => {
    const result = []
    const { width } = this.board.getDimension()
    const { cordX } = cordenate

    for (let i = 0; i < width; i++) {
      result.push(new Cordenate(cordX, i))
    }
    return result
  }

  private getVerticalCordenatesByCordenate = (cordenate: Cordenate): Cordenate[] => {
    const result = []
    const { height } = this.board.getDimension()
    const { cordY } = cordenate

    for (let i = 0; i < height; i++) {
      result.push(new Cordenate(i, cordY))
    }
    return result
  }

  private getDiagonalCordenatesByCordenate = (cordenate: Cordenate): Cordenate[] => {
    const result = []
    const { width, height } = this.board.getDimension()
    const { cordX, cordY } = cordenate

    for (let x = Math.max(0, cordX - cordY); x < Math.min(height, height + cordX - cordY); x++) {
      const y = x - (cordX - cordY);
      if (0 <= y && y < width) {
        result.push(new Cordenate(x, y));
      }
    }
    return result
  }

  private getAntiDiagonalCordenatesByCordenate = (cordenate: Cordenate): Cordenate[] => {
    const result = []
    const { width, height } = this.board.getDimension()
    const { cordX, cordY } = cordenate

    for (let x = Math.max(0, cordX + cordY - width + 1); x < Math.min(height, cordX + cordY + 1); x++) {
      const y = cordX + cordY - x;
      if (0 <= y && y < width) {
        result.push(new Cordenate(x, y))
      }
    }

    return result.reverse()
  }

  getCordsByOrientationAndCordenate = (orientation: orientationType, currentCordenate: Cordenate): Cordenate[] => {
    switch (orientation) {
      case "horizontally":
        return this.getHorizontalCordsByCordenate(currentCordenate)
      case "vertically":
        return this.getVerticalCordenatesByCordenate(currentCordenate)
      case "diagonally":
        return this.getDiagonalCordenatesByCordenate(currentCordenate)
      case "antidiagonally":
        return this.getAntiDiagonalCordenatesByCordenate(currentCordenate)
    }
  }

}