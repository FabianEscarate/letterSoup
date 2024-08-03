import {
  hasAnotherLetters,
  generateRegexByGroupOfSpacesAndLetters, 
  isWhiteSpace,
  splitsGroupOfSpacesAndLetter,
  joinRegexStringWithPipe
} from "../../src/utils/regex";


describe('Regex Suite', () => {

  test('should validate if line has letters', () => {
    const lineWithLetters = '   sa   '
    const lineWithOutLetters = '        '

    expect(hasAnotherLetters(lineWithLetters)).toBeTruthy()
    expect(hasAnotherLetters(lineWithOutLetters)).toBeFalsy()
  })

  test('should valid a empty string', () => {
    const lineEmpty = '      '

    expect(isWhiteSpace(lineEmpty)).toBeTruthy()
  })

  test('should valid a string with letters', () => {
    const lineEmpty = 'asdf'

    expect(!isWhiteSpace(lineEmpty)).toBeTruthy()
  })

  test('should return groups of space and letters', () => {
    const lineGenerate = '       i    a    '.toUpperCase()

    const splittedLine = splitsGroupOfSpacesAndLetter(lineGenerate)

    if (!splittedLine) return

    expect(splittedLine.length).toBe(5)
    expect(splittedLine[1]).toBe('I')
    expect(splittedLine[3]).toBe('A')
  })

  test('should join regex string with pipes', () => {
    const firstRegex = '(^.{1,7}i.{4}a.{1,4}$)'
    const secondRegex = '(^.{1,7}i.{1,4}$)'
    const thirdRegex = '(^.{1,4}a.{1,4}$)'
    const expectedStringRegex = '(^.{1,7}i.{4}a.{1,4}$)|(^.{1,7}i.{1,4}$)|(^.{1,4}a.{1,4}$)'

    expect(
      joinRegexStringWithPipe(
        firstRegex,
        secondRegex,
        thirdRegex
      )
    ).toBe(expectedStringRegex)
  })

  test('should return regex expresion from expecific group of spaces and letters', () => {
    const groupGenerate = ['       ', 'i', '    ', 'a', '    '] as RegExpMatchArray

    const regexExpresionResult = generateRegexByGroupOfSpacesAndLetters(groupGenerate)

    expect(regexExpresionResult).toBe(/(^.{1,7}i.{4}a.{1,4}$)|(^.{1,7}i.{1,4}$)|(^.{1,4}a.{1,4}$)/gm)
  })



})