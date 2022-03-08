export default class TurnManager {
  playerCount: number
  private currentTurn: number
  constructor(playerCount: number) {
    this.playerCount = playerCount
    this.currentTurn = 0
  }
  getTurn(): number {
    return this.currentTurn
  }
  nextTurn() {
    this.currentTurn++
    if (this.currentTurn >= this.playerCount) this.currentTurn = 0
  }
}