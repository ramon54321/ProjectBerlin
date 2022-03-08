import { drawCell } from './Drawing/cells'
import * as Drawing from './Drawing'
import * as Input from './Input'
import * as Logic from './Logic'

// Parameters
export const WORLD_WIDTH = 64
export const WORLD_HEIGHT = 64

// Setup
export const drawingInfo = Drawing.init()
Input.init(drawingInfo, WORLD_WIDTH, WORLD_HEIGHT, (clickInfo: Input.ClickInfo) => Logic.onClickCell(clickInfo))

// Draw initial world
Drawing.drawRect(drawingInfo.context, 0, 0, drawingInfo.width, drawingInfo.height, { color: "#ccd5ae" })
for (let y = 0; y < WORLD_HEIGHT; y++) {
  for (let x = 0; x < WORLD_WIDTH; x++) {
    drawCell({x, y})
  }
}
