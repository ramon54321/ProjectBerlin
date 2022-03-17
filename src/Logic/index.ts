import { database } from '../Store'
import * as Graphics from '../Graphics'
import { ClickInfo } from '../types'
import PlayerManager from './PlayerManager'
import TurnManager from './TurnManager'
import Orchestrator from './Orchestrator'
import { WORLD_HEIGHT, WORLD_WIDTH } from '../config'
import * as Tokens from '../Store/tokens'

export const playerManager = new PlayerManager(3)
const orchestrator = new Orchestrator(database, playerManager)
export const turnManager = new TurnManager(playerManager.getPlayerCount(), orchestrator)

while (Tokens.tokens.count() < playerManager.getPlayerCount() * 2) {
  const x = Math.floor(Math.random() * WORLD_WIDTH)
  const y = Math.floor(Math.random() * WORLD_HEIGHT)
  if (Tokens.tokens.findOne({ x, y })) continue
  if (Math.random() < 0.5) Tokens.insert({kind: 'Squad', x, y, playerId: turnManager.getTurn()})
  else Tokens.insert({kind: 'Humvee', x, y, playerId: turnManager.getTurn()})
  turnManager.nextTurn()
}

export function onClickNextTurn() {
  turnManager.nextTurn()
}

export function onClickCell(clickInfo: ClickInfo) {
  const position = clickInfo.cellPosition
  const token = Tokens.tokens.findOne({ x: position.x, y: position.y })
  if (token) {
    if (token.kind === "Obstruction") Tokens.remove(token)
  } else {
    Tokens.insert({kind: 'Obstruction', x: position.x, y: position.y})
  }
  Graphics.refreshCell(position, database, playerManager)
}
