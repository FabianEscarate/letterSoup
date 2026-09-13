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

    test('Should get line by orientation', () => {
      const horizontallyLine = crossRowInstance.getLineByOrientation('horizontally')
      const verticallyLine = crossRowInstance.getLineByOrientation('vertically')
      const diagonallyLine = crossRowInstance.getLineByOrientation('diagonally')
      const antidiagonallyLine = crossRowInstance.getLineByOrientation('antidiagonally')

      expect(horizontallyLine).toBeDefined()
      expect(verticallyLine).toBeDefined()
      expect(diagonallyLine).toBeDefined()
      expect(antidiagonallyLine).toBeDefined()
    })

    test('Should return the line that matches each orientation', () => {
      const board = new PlayBoard(3)
      const center = new Cordenate(2, 2)

      board.setSlot(2, 0, 'h')
      board.setSlot(2, 1, 'h')
      board.setSlot(2, 3, 'h')
      board.setSlot(2, 4, 'h')
      board.setSlot(0, 2, 'v')
      board.setSlot(1, 2, 'v')
      board.setSlot(3, 2, 'v')
      board.setSlot(4, 2, 'v')
      board.setSlot(0, 0, 'd')
      board.setSlot(1, 1, 'd')
      board.setSlot(3, 3, 'd')
      board.setSlot(4, 4, 'd')
      board.setSlot(4, 0, 'a')
      board.setSlot(3, 1, 'a')
      board.setSlot(1, 3, 'a')
      board.setSlot(0, 4, 'a')
      board.setSlot(2, 2, 'C')

      const crossRowInstance = new CrossRow(board, center)

      expect(crossRowInstance.getLineByOrientation('horizontally')).toBe('hhChh')
      expect(crossRowInstance.getLineByOrientation('vertically')).toBe('vvCvv')
      expect(crossRowInstance.getLineByOrientation('diagonally')).toBe('ddCdd')
      expect(crossRowInstance.getLineByOrientation('antidiagonally')).toBe('aaCaa')
    })
  })
})