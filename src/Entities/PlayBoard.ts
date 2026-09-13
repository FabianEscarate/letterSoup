import { puzzleType } from "../Types";
import Cordenates from "./Cordenates";
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

    const cells = Array(width * height).fill(BLANK_SPACE)
    const board: puzzleType = []

    for (let row = 0; row < height; row++) {
      board.push(cells.splice(0, width))
    }

    return board
  }

  setSlot = (cordX: number, cordY: number, letter: string) => { this.board[cordX][cordY] = letter }

  getSlot = (cordX: number, cordY: number) => this.board[cordX][cordY]

  getPlayBoard = () => this.board

  expandBoard = () => {
    this.incrementDimensions()
    const { width, height } = this.getDimension()
    const newBoard = Array.from({ length: height }, () => Array.from({ length: width }, () => BLANK_SPACE));

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        newBoard[i][j] = this.board[i][j];
      }
    }
    
    this.board = newBoard;
    this.cordenates = new Cordenates(this);
  }
}