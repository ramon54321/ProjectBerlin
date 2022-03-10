import Orchestrator from "./Orchestrator"

export default class TurnManager {
  playerCount: number
  orchestrator: Orchestrator
  private currentTurn: number
  constructor(playerCount: number, orchestrator: Orchestrator) {
    this.playerCount = playerCount
    this.orchestrator = orchestrator
    this.currentTurn = 0
  }
  getTurn(): number {
    return this.currentTurn
  }
  nextTurn() {
    this.currentTurn++
    if (this.currentTurn >= this.playerCount) {
      this.currentTurn = 0
      this.orchestrator.tickRound()
    }
  }
}