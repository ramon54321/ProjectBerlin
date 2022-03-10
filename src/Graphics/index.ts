import * as Drawing from '../Drawing'
import * as Config from '../config'
import { Vec2 } from '../types'
import { Token } from "../Logic/Token"
import PlayerManager from '../Logic/PlayerManager'

export function refreshCell(position: Vec2, database: Loki, playerManager: PlayerManager) {
  drawCellRect(position, { color: "#faedcd", padding: 1 })
  if (!database) return
  const tokens = database.getCollection<Token>("tokens")
  const token = tokens.findOne({ x: position.x, y: position.y })
  if (!token) return
  if (token.kind === "Obstruction") drawCellRect(position, { color: "#d9ae94", padding: 5 })
  else if (token.kind === "Squad") drawCellText(position, "S", { color: playerManager.getPlayerByIndex(token.playerIndex).color })
  else if (token.kind === "Humvee") drawCellText(position, "H", { color: playerManager.getPlayerByIndex(token.playerIndex).color })
}

function drawCellRect(position: Vec2, options?: {color?: string, padding?: number}) {
  const _options = { ...{color: "#ccd5ae", padding: 0}, ...options }
  const cellWidth = Drawing.drawingInfo.width / Config.WORLD_WIDTH
  const cellHeight = Drawing.drawingInfo.height / Config.WORLD_HEIGHT
  const xMin = cellWidth * position.x
  const yMin = Drawing.drawingInfo.height - cellHeight * position.y
  Drawing.drawRect(Drawing.drawingInfo.context, xMin + _options.padding, yMin - _options.padding, cellWidth - _options.padding * 2, -(cellHeight - _options.padding * 2), { color: _options.color })
}

function drawCellText(position: Vec2, text: string, options?: {size?: number, color?: string, horizontal?: CanvasTextAlign, vertical?: CanvasTextBaseline}) {
  const cellWidth = Drawing.drawingInfo.width / Config.WORLD_WIDTH
  const cellHeight = Drawing.drawingInfo.height / Config.WORLD_HEIGHT
  const xMin = cellWidth * position.x
  const yMin = Drawing.drawingInfo.height - cellHeight * position.y
  Drawing.drawText(Drawing.drawingInfo.context, text, xMin + cellWidth / 2, yMin - cellHeight / 2, options)
}
