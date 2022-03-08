export const CANVAS_SCALE = 2

export interface DrawingInfo {
  context: CanvasRenderingContext2D
  canvas: HTMLCanvasElement
  width: number
  height: number
  scaledWidth: number
  scaledHeight: number
}

export function init(): DrawingInfo {
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  
  const canvas = document.getElementById("canvas") as HTMLCanvasElement
  canvas.style.position = 'absolute'
  canvas.style.left = "0px"
  canvas.style.top = "0px"
  canvas.style.width = `${screenWidth}px`
  canvas.style.height = `${screenHeight}px`
  
  const context = canvas.getContext("2d")
  
  canvas.width = screenWidth * CANVAS_SCALE
  canvas.height = screenHeight * CANVAS_SCALE

  return {
    context: context,
    canvas: canvas,
    width: canvas.width,
    height: canvas.height,
    scaledWidth: screenWidth,
    scaledHeight: screenHeight,
  }
}

export function drawRect(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, options?: {color?: string}) {
  const _options = { ...{color: "#ccd5ae"}, ...options }
  context.fillStyle = _options.color
  context.fillRect(x, y, w, h)
}

export function drawText(context: CanvasRenderingContext2D, text: string, x: number, y: number, options?: {size?: number, color?: string, horizontal?: CanvasTextAlign, vertical?: CanvasTextBaseline}) {
  const _options = { ...{ size: 24, color: "#fefae0", horizontal: "center" as CanvasTextAlign, vertical: "middle" as CanvasTextBaseline }, ...options }
  context.textAlign = _options.horizontal
  context.textBaseline = _options.vertical
  context.font = `${_options.size}px sans-serif`
  context.fillStyle = _options.color
  context.fillText(text, x, y)
}
