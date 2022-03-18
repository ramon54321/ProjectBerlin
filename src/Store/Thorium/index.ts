import * as React from 'react'
import { v4 as uuidv4 } from "uuid"

class Slice<T> {
  readonly name: string
  readonly reducers: T
  constructor(name: string, reducers: T) {
    this.name = name
    this.reducers = reducers
  }
}

export class Store {
  private readonly slices: any = {}
  private readonly listeners: any = {}
  constructor() {

  }
  addSlice<T>(name: string, reducers: T) {
    this.slices[name] = new Slice(name, reducers)
    const actions = []
    for (const action in reducers) {
      actions.push({
        [action]: (payload) => this.dispatch({ sliceName: name, action, payload })
      })
    }
    return {
      actions: Object.assign({}, ...actions)
    }
  }
  private dispatch(data: any) {
    this.slices[data.sliceName].reducers[data.action](data.payload)
    const listenerMap = (this.listeners as any)[data.sliceName]
    for (const key in listenerMap) {
      listenerMap[key]()
    }
  }
  useStore(on: string[]) {
    const forceUpdate = useForceUpdate()
    React.useEffect(() => {
      const subscribed = on.map(sliceName => ({
        id: this.subscribe(sliceName, () => forceUpdate()),
        sliceName: sliceName,
      }))
      return () => subscribed.forEach(sub => this.unsubscribe(sub.sliceName, sub.id))
    }, [])
  }
  private subscribe(sliceName: string, callback: any): string {
    if (!this.listeners[sliceName]) this.listeners[sliceName] = {}
    const id = uuidv4()
    this.listeners[sliceName][id] = callback
    return id
  }
  private unsubscribe(sliceName: string, id: string) {
    if (!this.listeners[sliceName]) return
    if (!this.listeners[sliceName][id]) return
    delete this.listeners[sliceName][id]
  }
}

function useForceUpdate(): () => void {
  return React.useReducer(() => ({}), {})[1] as () => void
}
