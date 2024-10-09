import { puzzleType } from "../Types";
import Cordenates, { Cordenate } from "./Cordenates";
import CrossRow from "./CrossRow";
import DimensionBoard from "./DimensionBoard";

const BLANK_SPACE = ' '

export default class PlayBoard extends DimensionBoard{
  cordenates: Cordenates
  private board: string[][]

  constructor(length: number) {
    super(length)
    this.board = this.generate()
    this.cordenates = new Cordenates(this)
  }

  private generate = () => {
    const {
      width,
      height
    } = this.getDimension()

    const board: puzzleType = Array(...Array(width * height)).reduce((resultValue, currentValue, index, array) => {
      resultValue = [...resultValue, array.splice(0, width).map(index => BLANK_SPACE)]
      return resultValue
    }, [])

    return board
  }

  setSlot = (cordX: number, cordY: number, letter: string) => { this.board[cordX][cordY] = letter }

  getSlot = (cordX: number, cordY: number) => this.board[cordX][cordY]

  getPlayBoard = () => this.board
}