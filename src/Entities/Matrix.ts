import { puzzleType } from "../Types";
import Cords, { Cord } from "./Cords";
import DimensionPuzzle from "./Dimension";
import Lines from "./Lines";

const BLANK_SPACE = ' '

export default class Matrix {
  dimension: DimensionPuzzle
  cords: Cords
  lines: Lines
  private matrix: string[][]

  constructor(length: number) {
    this.dimension = new DimensionPuzzle(length)
    this.matrix = this.generate()
    this.cords = new Cords(this)
    this.lines = new Lines()

  }

  private generate = () => {
    const {
      width,
      height
    } = this.dimension.getDimension()

    const matrix: puzzleType = Array(...Array(width * height)).reduce((resultValue, currentValue, index, array) => {
      resultValue = [...resultValue, array.splice(0, width).map(index => BLANK_SPACE)]
      return resultValue
    }, [])

    return matrix
  }

  setSlot = (cordX: number, cordY: number, letter: string) => { this.matrix[cordX][cordY] = letter }

  getSlot = (cordX: number, cordY: number) => this.matrix[cordX][cordY]

  setLines = (lines: Lines) => { this.lines = lines }

  getMatrix = () => this.matrix
}