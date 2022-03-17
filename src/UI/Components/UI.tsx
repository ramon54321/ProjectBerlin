import * as React from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { onClickNextTurn } from '../../Logic'
// import { RootState, store } from '../../Store'
import { Button, Group, Text } from "@mantine/core"
import { PlayerTrackNext } from "tabler-icons-react"
import tokens from '../../Store/tokens'

// export class UI extends React.Component {
//   render(): React.ReactNode {
//       return <div style={{position: "absolute", top: "16px", left: "16px"}}>
//         <button onClick={onClickNextTurn}>Next Turn</button>
//         <button>World</button>
//         <span>Token Count: {5}</span>
//       </div>
//   }
// }

interface InfoProps {
  turn: number
}

const Info: React.FC<InfoProps> = (props) => {
  console.log("Rendering Info")

  // const turns = useSelector((state: RootState) => state.turns)
  // const tokens = useSelector((state: RootState) => state.tokens)

  return <>
  <Group>
    <Button onClick={onClickNextTurn} rightIcon={<PlayerTrackNext size={10}/>}>Next Turn</Button>
    <Button>World</Button>
    <Text>Turn Count: {props.turn}</Text>
    {/* <Text>Token Count: {tokens.length}</Text> */}
  </Group>
  </>
}

import { observer } from "mobx-react"
import { Timer } from '..'
import { observable } from 'mobx'

// Build a "user interface" that uses the observable state.
// const TimerView = observer(({ timer }) => (
//     <button onClick={() => timer.reset()}>Seconds passed: {timer.secondsPassed}</button>
// ))

// ReactDOM.render(<TimerView timer={myTimer} />, document.body)


interface UIProps {
  timer: Timer
}

// let x = observable({value: 5})

// export const UI: React.FC<UIProps> = observer((props) => {
//   console.log("Rendering UI")

//   return <Provider store={store}>
//     <div style={{position: "absolute", top: "16px", left: "16px"}}>
//       <Info turn={x.value}/>
//       <Button onClick={() => x.value++}>now</Button>
//     </div>
//   </Provider>
// })

function refreshOn(WrappedComponent: any, on: any[]) {
  return class extends React.Component {
    private subscribed: any[]
    componentDidMount(): void {
        this.subscribed = on.map(sliceName => ({
          // id: subscribe(sliceName, () => console.log("refreshing")),
          id: subscribe(sliceName, this.refresh.bind(this)),
          sliceName: sliceName,
        }))
    }
    componentWillUnmount(): void {
        this.subscribed.forEach(sub => unsubscribe(sub.sliceName, sub.id))
    }
    refresh() {
      this.forceUpdate()
    }
    render(): React.ReactNode {
        return <WrappedComponent />
    }
  }
}

let counter = 0

// const slice = {
//   name: 'myslice',
//   reducers: {
//     increment: () => counter++,
//     decrement: () => counter--,
//     incrementBy: (payload) => counter += payload.amount
//   },
//   serialize: () => JSON.stringify({counter: counter}),
//   deserialize: (str: string) => counter = JSON.parse(str).counter,
// }

class Slice<T> {
  readonly name: string
  readonly reducers: T
  constructor(name: string, reducers: T) {
    this.name = name
    this.reducers = reducers
  }
}

class Store {
  private readonly slices: any = {}
  constructor() {

  }
  addSlice(name: string, reducers: any) {
    this.slices[name] = new Slice(name, reducers)
  }
  dispatch(sliceName: string, action: string, payload?: any) {
    console.log(this.slices[sliceName].reducers)
    console.log(this.slices[sliceName].reducers[action])
    // this.slices[sliceName].reducers[action]()
    this.slices[sliceName].reducers[action](payload)
    const listenerMap = (listeners as any)[sliceName]
    for (const key in listenerMap) {
      listenerMap[key]()
    }
    // ;(listeners as any)[sliceName]?.foreach(l => l())
  }
}

const store = new Store()
store.addSlice('myslice', {
  increment: () => counter++,
  decrement: () => counter--,
  incrementBy: (payload) => counter += payload.amount
})

const listeners = {

}

import { v4 as uuidv4 } from "uuid" 

function subscribe(sliceName: string, callback: any): string {
  if (!listeners[sliceName]) listeners[sliceName] = {}
  const id = uuidv4()
  listeners[sliceName][id] = callback
  return id
}

function unsubscribe(sliceName: string, id: string) {
  if (!listeners[sliceName]) return
  if (!listeners[sliceName][id]) return
  delete listeners[sliceName][id]
}

// type Action = keyof typeof slice.reducers

// function dispatch<T extends Action>(action: T, payload?: any) {
//   store.reducers[action](payload)
//   (listeners as any)[action]?.foreach(l => l.refresh())
// }






export const UI = refreshOn((props) => {
  console.log("Rendering UI")

  return <>
    <div style={{position: "absolute", top: "16px", left: "16px"}}>
      <Info turn={counter}/>
      <Button onClick={() => store.dispatch('myslice', 'increment')}>now</Button>
    </div>
  </>
}, ['myslice'])