import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { UI } from './Components/UI'

export function init() {
  ReactDOM.render(
    React.createElement(UI),
    document.getElementById("root")
  )
}
