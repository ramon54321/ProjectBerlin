import * as Loki from 'lokijs'
import * as Graphics from '../Graphics'
import { ClickInfo } from '../types'
import TurnManager from './TurnManager'
import PlayerManager from './PlayerManager'

export const database = new Loki("mydb")
const tokens = database.addCollection<Token>("tokens")

const playerManager = new PlayerManager(3)
const turnManager = new TurnManager(3)

export function onClickCell(clickInfo: ClickInfo) {
  const position = clickInfo.cellPosition
  const token = tokens.findOne({ x: position.x, y: position.y })
  if (token) {
    tokens.remove(token)
  } else {
    tokens.insert(new Token(position.x, position.y, playerManager.getPlayerByIndex(turnManager.getTurn()).color))
  }
  turnManager.nextTurn()
  Graphics.refreshCell(position, database)
}

export class Token {
  x: number
  y: number
  color: string
  constructor(x: number, y: number, color: string) {
    this.x = x
    this.y = y
    this.color = color
  }
}
