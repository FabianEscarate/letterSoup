import { orientationEnum, orientationType } from "../Types"
import { DimensionType } from "./Dimension"
import Lines from "./Lines"
import Matrix from "./Matrix"



export class Cord {
  cordX: number
  cordY: number

  constructor(cordX: number, cordY: number) {
    this.cordX = cordX
    this.cordY = cordY
  }
}

export default class Cords {
  private matrix: Matrix
  private currentPosition?: Cord = undefined
  private allCordsOfMatrix: Cord[]
  constructor(matrix: Matrix) {
    this.matrix = matrix
    this.allCordsOfMatrix = this.getAllCordsOfMatrix(matrix.dimension.getDimension())
  }

  private getAllCordsOfMatrix = (dimensionMatrix: DimensionType) => {
    const {
      width,
      height
    } = dimensionMatrix

    const result = []

    for (let x = 0; x < height; x++)
      for (let y = 0; y < width; y++)
        result.push(new Cord(x, y))

    return result
  }

  scrambleCordsOfMatrix = () => {
    let scrambleCords = []
    const cordsOfMatrix = this.allCordsOfMatrix
    while (cordsOfMatrix.length > 0) {
      scrambleCords.push(cordsOfMatrix.splice(Math.floor(Math.random() * cordsOfMatrix.length), 1)[0])
    }
    return scrambleCords
  }

  setCordPosition = (cord: Cord) => {
    this.currentPosition = cord
    this.matrix.setLines(new Lines(this.matrix))
  }

  getCordPosition = () => {
    if (!this.currentPosition)
      throw new Error("Undefined current cord position ");

    return this.currentPosition
  }

  private horizontalCords = (): Cord[] => {
    const result = []
    const { width } = this.matrix.dimension.getDimension()
    const { cordX } = this.matrix.cords.getCordPosition()

    for (let i = 0; i < width; i++) {
      result.push(new Cord(cordX,i))
    }
    return result
  }

  private verticalCords = (): Cord[] => {
    const result = []
    const { height } = this.matrix.dimension.getDimension()
    const { cordY } = this.matrix.cords.getCordPosition()

    for (let i = 0; i < height; i++) {
      result.push(new Cord(i, cordY))
    }
    return result
  }

  private diagonalCords = (): Cord[] => {
    const result = []
    const { width, height } = this.matrix.dimension.getDimension()
    const { cordX, cordY } = this.matrix.cords.getCordPosition()

    for (let x = Math.max(0, cordX - cordY); x < Math.min(height, height + cordX - cordY); x++) {
      const y = x - (cordX - cordY);
      if (0 <= y && y < width) {
        result.push(new Cord(x, y));
      }
    }
    return result
  }

  private antiDiagonalCords = (): Cord[] => {
    const result = []
    const { width, height } = this.matrix.dimension.getDimension()
    const { cordX, cordY } = this.matrix.cords.getCordPosition()

    for (let x = Math.max(0, cordX + cordY - width + 1); x < Math.min(height, cordX + cordY + 1); x++) {
      const y = cordX + cordY - x;
      if (0 <= y && y < width) {
        result.push(new Cord(x, y))
      }
    }

    return result.reverse()
  }

  getCordsFromCurrentPositionByOrientation = (orientation: orientationType): Cord[] => {
    switch (orientation) {
      case "horizontally":
        return this.horizontalCords()
      case "vertically":
        return this.verticalCords()
      case "diagonally":
        return this.diagonalCords()
      case "antidiagonally":
        return this.antiDiagonalCords()
    }
  }

}