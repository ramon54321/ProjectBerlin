import * as React from 'react'
import { onClickNextTurn } from '../../Logic'
import { Button, Group, Text } from "@mantine/core"
import { PlayerTrackNext } from "tabler-icons-react"
import { turn } from '../../Store/turns'
import { store } from '../../Store'

interface InfoProps {
  turn: number
}

const Info: React.FC<InfoProps> = (props) => {
  console.log("Rendering Info")

  return <>
  <Group>
    <Button onClick={onClickNextTurn} rightIcon={<PlayerTrackNext size={10}/>}>Next Turn</Button>
    <Text>Turn Count: {props.turn}</Text>
  </Group>
  </>
}

export const UI = (props) => {
  console.log("Rendering UI")

  store.useStore(['turns'])

  return <>
    <div style={{position: "absolute", top: "16px", left: "16px"}}>
      <Info turn={turn}/>
    </div>
  </>
}
