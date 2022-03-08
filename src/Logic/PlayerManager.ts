const PLAYER_COLORS = [
  "#1b9aaa",
  "#ef476f",
  "#ffc43d",
  "#06d6a0",
]

export default class PlayerManager {
  private players: Player[]
  constructor(playerCount: number) {
    this.players = []
    for (let i = 0; i < playerCount; i++) {
      this.players[i] = new Player(PLAYER_COLORS[i])
    }
  }
  getPlayerByIndex(index: number): Player {
    return this.players[index]
  }
}

class Player {
  readonly color: string
  constructor(color: string) {
    this.color = color
  }
}
