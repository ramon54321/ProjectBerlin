import { Token } from "./Token"
import * as Graphics from "../Graphics"
import PlayerManager from "./PlayerManager"

export default class Orchestrator {
  private database: Loki
  private playerManager: PlayerManager
  constructor(database: Loki, playerManager: PlayerManager) {
    this.database = database
    this.playerManager = playerManager
  }
  tickRound() {
    const tokensToRemove = new Set<Token>()
    const tokens = this.database.getCollection<Token>("tokens")
    tokens.find().forEach(token => {
      const enemyTokens = tokens.find(
        {x: token.x - 1, y: token.y + 1}
      ).concat(
        tokens.find({x: token.x, y: token.y + 1})
      ).concat(
        tokens.find({x: token.x + 1, y: token.y + 1})
      ).concat(
        tokens.find({x: token.x - 1, y: token.y})
      ).concat(
        tokens.find({x: token.x + 1, y: token.y})
      ).concat(
        tokens.find({x: token.x - 1, y: token.y - 1})
      ).concat(
        tokens.find({x: token.x, y: token.y - 1})
      ).concat(
        tokens.find({x: token.x + 1, y: token.y - 1})
      ).filter(t => t.playerIndex !== token.playerIndex)
      if (enemyTokens.length >= 3) tokensToRemove.add(token)
    })
    tokensToRemove.forEach(token => {
      tokens.remove(token)
      Graphics.refreshCell({x: token.x, y: token.y}, this.database, this.playerManager)
    })
  }
}
