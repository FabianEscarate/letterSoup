
const MARGIN_PUZZLE = 1

export type DimensionType = {
  width: number,
  height: number
}

export default class DimensionBoard {
  private width: number
  private height: number

  constructor(length: number) {
    this.width = MARGIN_PUZZLE + length + MARGIN_PUZZLE
    this.height = MARGIN_PUZZLE + length + MARGIN_PUZZLE
  }

  getDimension(): DimensionType {
    return {
      width: this.width,
      height: this.height
    }
  }
}