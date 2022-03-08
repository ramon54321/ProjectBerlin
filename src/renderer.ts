import * as Drawing from './Drawing'
import * as Graphics from './Graphics'
import * as Input from './Input'
import * as Logic from './Logic'
import * as Config from './config'
import { ClickInfo } from './types'

// Setup
Drawing.init()
Input.init(Drawing.drawingInfo, Config.WORLD_WIDTH, Config.WORLD_HEIGHT, (clickInfo: ClickInfo) => Logic.onClickCell(clickInfo))

// Draw initial world
Drawing.drawRect(Drawing.drawingInfo.context, 0, 0, Drawing.drawingInfo.width, Drawing.drawingInfo.height, { color: "#ccd5ae" })
for (let y = 0; y < Config.WORLD_HEIGHT; y++) {
  for (let x = 0; x < Config.WORLD_WIDTH; x++) {
    Graphics.refreshCell({x, y})
  }
}
