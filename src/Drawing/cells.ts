import * as Drawing from '.'
import { Vec2 } from '../types'
import { drawingInfo, WORLD_WIDTH, WORLD_HEIGHT } from '../renderer'
import { Token } from '../Logic'

export function drawCell(position: Vec2, database?: Loki) {
  drawCellRect(position, { color: "#faedcd", padding: 1 })
  if (!database) return
  const tokens = database.getCollection<Token>("tokens")
  const token = tokens.findOne({ x: position.x, y: position.y })
  if (token)
    drawCellRect(position, { color: token.color, padding: 5 })
}

function drawCellRect(position: Vec2, options?: {color?: string, padding?: number}) {
  const _options = { ...{color: "#ccd5ae", padding: 0}, ...options }
  const cellWidth = drawingInfo.width / WORLD_WIDTH
  const cellHeight = drawingInfo.height / WORLD_HEIGHT
  const xMin = cellWidth * position.x
  const yMin = drawingInfo.height - cellHeight * position.y
  Drawing.drawRect(drawingInfo.context, xMin + _options.padding, yMin - _options.padding, cellWidth - _options.padding * 2, -(cellHeight - _options.padding * 2), { color: _options.color })
}