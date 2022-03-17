import * as Drawing from './Drawing'
import * as Graphics from './Graphics'
import * as Input from './Input'
import * as Store from './Store'
import * as Logic from './Logic'
import * as Config from './config'
import * as UI from './UI'
import { ClickInfo } from './types'

// Setup
Drawing.init()
Input.init(Drawing.drawingInfo, Config.WORLD_WIDTH, Config.WORLD_HEIGHT, (clickInfo: ClickInfo) => Logic.onClickCell(clickInfo))
UI.init()

// Draw initial world
Drawing.drawRect(Drawing.drawingInfo.context, 0, 0, Drawing.drawingInfo.width, Drawing.drawingInfo.height, { color: "#ccd5ae" })
for (let y = 0; y < Config.WORLD_HEIGHT; y++) {
  for (let x = 0; x < Config.WORLD_WIDTH; x++) {
    Graphics.refreshCell({x, y}, Store.database, Logic.playerManager)
  }
}






// abstract class Slice {
//   abstract apply()
//   abstract extract()
//   abstract 
// }

// let counter = 0

// const slice = {
//   reducers: {
//     increment: () => counter++,
//     decrement: () => counter--,
//     incrementBy: (payload) => counter += payload.amount
//   },
//   serialize: () => JSON.stringify({counter: counter}),
//   deserialize: (str: string) => counter = JSON.parse(str).counter
// }

// const store = {
//   ...slice,
// }

// // const listeners = {

// // }

// type Action = keyof typeof slice.reducers

// function dispatch<T extends Action>(action: T, payload?: any) {
//   store.reducers[action](payload)
//   // (listeners as any)[action]?.foreach(l => l.refresh())
// }

// dispatch('increment')



