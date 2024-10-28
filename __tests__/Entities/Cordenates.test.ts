import Cordenates from "../../src/Entities/Cordenates"
import PlayBoard from "../../src/Entities/PlayBoard"


describe('Cordenates Suite', () => {

  describe('Generate Instance', () => {

    test('Should generate Instance', () => {
      const cordenatesInstance = new Cordenates(new PlayBoard(5))

      expect(cordenatesInstance).toBeDefined()
    })
  })

  describe('Methods testing', () => {
    // add 2 slots, couse board add 2 slots for space
    const board = new PlayBoard(2)
    let cordenates: Cordenates
    beforeAll(() => {
      cordenates = new Cordenates(board)
    })

    test('Should get scramble cordenates from board', () => {
      const scrambleCords = cordenates.scrambleCordsOfMatrix()

      expect(scrambleCords[0]).not.toEqual([0, 0])
      expect(scrambleCords[1]).not.toEqual([0, 1])
    })

    test('Should get empty slots', () => {
      const scrambleCords = cordenates.scrambleCordsOfMatrix()

      board.setSlot(0, 0, 'L')

      const emptySlots = cordenates.getEmptySlots()

      expect(emptySlots).toHaveLength(15)
    })
  })
})