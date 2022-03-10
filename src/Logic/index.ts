import * as Loki from 'lokijs'
import * as Graphics from '../Graphics'
import { ClickInfo } from '../types'
import PlayerManager from './PlayerManager'
import TurnManager from './TurnManager'
import Orchestrator from './Orchestrator'
import { WORLD_HEIGHT, WORLD_WIDTH } from '../config'
import { HumveeToken, ObstructionToken, SquadToken, Token } from './Token'

export const database = new Loki("mydb")
const tokens = database.addCollection<Token>("tokens")

export const playerManager = new PlayerManager(3)
const orchestrator = new Orchestrator(database, playerManager)
export const turnManager = new TurnManager(playerManager.getPlayerCount(), orchestrator)

while (tokens.count() < playerManager.getPlayerCount() * 2) {
  const x = Math.floor(Math.random() * WORLD_WIDTH)
  const y = Math.floor(Math.random() * WORLD_HEIGHT)
  if (tokens.findOne({ x, y })) continue
  if (Math.random() < 0.5) tokens.insert(new SquadToken(x, y, turnManager.getTurn()))
  else tokens.insert(new HumveeToken(x, y, turnManager.getTurn()))
  turnManager.nextTurn()
}

export function onClickNextTurn() {
  turnManager.nextTurn()
}

export function onClickCell(clickInfo: ClickInfo) {
  const position = clickInfo.cellPosition
  const token = tokens.findOne({ x: position.x, y: position.y })
  if (token) {
    if (token.kind === "Obstruction") tokens.remove(token)
  } else {
    tokens.insert(new ObstructionToken(position.x, position.y))
  }
  Graphics.refreshCell(position, database, playerManager)
}
