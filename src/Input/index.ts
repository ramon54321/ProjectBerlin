import { ClickInfo, KeyInfo } from '../types'
import { DrawingInfo, CANVAS_SCALE } from '../Drawing'

export function init(
  drawingInfo: DrawingInfo,
  worldWidth: number,
  worldHeight: number,
  onClickCell: (clickInfo: ClickInfo) => void,
  onKeyDown: (keyInfo: KeyInfo) => void,
) {
  drawingInfo.canvas.addEventListener('click', (event) => {
    const cellWidth = drawingInfo.width / worldWidth
    const cellHeight = drawingInfo.height / worldHeight
    const position = {
      x: event.clientX * CANVAS_SCALE,
      y: drawingInfo.height - event.clientY * CANVAS_SCALE,
    }
    const cellPosition = {
      x: Math.floor(position.x / cellWidth),
      y: Math.floor(position.y / cellHeight),
    }
    onClickCell({ position, cellPosition })
  })

  document.addEventListener('keydown', (event) =>
    onKeyDown({ key: event.key }),
  )
}
