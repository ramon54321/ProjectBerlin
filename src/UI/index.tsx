import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { UI } from './Components/UI'

import { makeAutoObservable } from "mobx"

// Model the application state.
export class Timer {
  secondsPassed = 0

  constructor() {
      makeAutoObservable(this)
  }

  increase() {
      this.secondsPassed += 1
  }

  reset() {
      this.secondsPassed = 0
  }
}

export const myTimer = new Timer()

export function init() {
  ReactDOM.render(<UI /*timer={myTimer}*//>,
    document.getElementById("root")
  )
}
