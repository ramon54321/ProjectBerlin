import * as React from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { onClickNextTurn } from '../../Logic'
import { RootState, store } from '../../Store'
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
  const tokens = useSelector((state: RootState) => state.tokens)

  return <>
  <Group>
    <Button onClick={onClickNextTurn} rightIcon={<PlayerTrackNext size={10}/>}>Next Turn</Button>
    <Button>World</Button>
    <Text>Turn Count: {props.turn}</Text>
    <Text>Token Count: {tokens.length}</Text>
  </Group>
  </>
}

import { observer } from "mobx-react"
import { Timer } from '..'

// Build a "user interface" that uses the observable state.
// const TimerView = observer(({ timer }) => (
//     <button onClick={() => timer.reset()}>Seconds passed: {timer.secondsPassed}</button>
// ))

// ReactDOM.render(<TimerView timer={myTimer} />, document.body)


interface UIProps {
  timer: Timer
}

export const UI: React.FC<UIProps> = observer((props) => {
  console.log("Rendering UI")

  return <Provider store={store}>
    <div style={{position: "absolute", top: "16px", left: "16px"}}>
      <Info turn={props.timer.secondsPassed}/>
    </div>
  </Provider>
})