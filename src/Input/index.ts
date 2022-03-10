import { ClickInfo } from '../types'
import { DrawingInfo, CANVAS_SCALE } from '../Drawing'
import { onClickNextTurn } from '../Logic'

export function init(drawingInfo: DrawingInfo, worldWidth: number, worldHeight: number, onClickCell: (clickInfo: ClickInfo) => void) {
  drawingInfo.canvas.addEventListener("click", (event) => {
    const cellWidth = drawingInfo.width / worldWidth
    const cellHeight = drawingInfo.height / worldHeight
    const position = { x: event.clientX * CANVAS_SCALE, y: drawingInfo.height - event.clientY * CANVAS_SCALE}
    const cellPosition = { x: Math.floor(position.x / cellWidth), y: Math.floor(position.y / cellHeight)}
    onClickCell({position, cellPosition})
  })
  const nextTurnButton = createButton("Next Turn")
  nextTurnButton.addEventListener("click", (event) => {
    onClickNextTurn()
  })
  document.body.appendChild(nextTurnButton)
}

function createButton(text: string): HTMLButtonElement {
  const button = document.createElement("button")
  button.style.position = "absolute"
  button.style.right = "16px"
  button.style.top = "16px"
  button.innerHTML = text
  return button
}