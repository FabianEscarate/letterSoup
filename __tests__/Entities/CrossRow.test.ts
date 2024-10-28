import { Cordenate } from "../../src/Entities/Cordenates"
import CrossRow from "../../src/Entities/CrossRow"
import PlayBoard from "../../src/Entities/PlayBoard"
import * as regex from "../../src/utils/regex"

describe('CrossRow Suite', () => {
  describe('Generate Instance', () => {
    test('Should generate Instance', () => {
      const crossRowInstance = new CrossRow(new PlayBoard(1), new Cordenate(0, 0))

      expect(crossRowInstance).toBeDefined()
    })
  })

  describe('Methods testing', () => {
    const board = new PlayBoard(1)
    const cordenate = new Cordenate(0, 0)
    let crossRowInstance: CrossRow

    beforeAll(() => {
      crossRowInstance = new CrossRow(board, cordenate)
    })

    test('Should get lines with Regex', () => {
      const generateRegexByLineSpyOn = jest.spyOn(regex, 'generateRegexByLine').mockImplementation((line: string) => {
        return new RegExp('mockResponse')
      })

      const lineWithRegex = crossRowInstance.getLinesWithRegex()

      expect(generateRegexByLineSpyOn).toHaveBeenCalled()

    })
  })
})