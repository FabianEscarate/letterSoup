
export type puzzleType = string[][]
export type orientationType = "horizontally" | "vertically" | "diagonally" | "antidiagonally"
export type linesByCordsType = {
  horizontallyLine: string;
  verticallyLine: string;
  diagonallyDownLine: string;
  diagonallyUpLine: string;
}

export enum matchRegexLines {
  matchRegexDiagonallyDownLine = "diagonally",
  matchRegexDiagonallyUpLine = "antidiagonally",
  matchRegexHorizontallyLine = "horizontally",
  matchRegexVerticallyLine = "vertically"
}

export type regexValueByLine<Type> = {
  [key in keyof Type as `regex${Capitalize<string & key>}`]: RegExp
}

export type regexValueByLineType = regexValueByLine<linesByCordsType>
export enum orientationEnum {
  horizontally = "horizontally",
  vertically = "vertically",
  diagonally = "diagonally",
  antidiagonally = "antidiagonally"
}
export type wordListByLine<Type> = {
  [key in keyof Type as `match${Capitalize<string & key>}`]: string[]
}

export type wordListByLineType = wordListByLine<regexValueByLineType>

export type interectionType = {
  wordIndex: number,
  lineIndex: number
}

export type interectionsType = interectionType[]
