import PlayBoard from "../../src/Entities/PlayBoard"

describe('PlayBoard Suite', () => {
  describe('Generate Instance', () => {
    test('Should generate Instance', () => {
      const playBoardInstance = new PlayBoard(2)

      expect(playBoardInstance).toBeDefined()
    })
  })

  describe('expandBoard', () => {
    test('Should expand dimensions by one in each axis', () => {
      const playBoard = new PlayBoard(2)
      const { width, height } = playBoard.getDimension()

      playBoard.expandBoard()

      const { width: expandedWidth, height: expandedHeight } = playBoard.getDimension()
      expect(expandedWidth).toBe(width + 1)
      expect(expandedHeight).toBe(height + 1)
    })

    test('Should preserve the previous content', () => {
      const playBoard = new PlayBoard(1)
      playBoard.setSlot(1, 1, 'A')

      playBoard.expandBoard()

      const expandedBoard = playBoard.getPlayBoard()
      expect(expandedBoard[1][1]).toBe('A')
      expect(expandedBoard).toHaveLength(playBoard.getDimension().height)
    })

    test('Should regenerate cordenates', () => {
      const playBoard = new PlayBoard(1)
      const cordenatesBeforeExpand = playBoard.cordenates

      playBoard.expandBoard()

      expect(playBoard.cordenates).not.toBe(cordenatesBeforeExpand)
      expect(playBoard.cordenates.getEmptySlots()).toHaveLength(playBoard.getDimension().width * playBoard.getDimension().height)
    })
  })
})