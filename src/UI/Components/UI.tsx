import * as React from 'react'
import { onClickNextTurn, playerManager, turnManager } from '../../Logic'
import { Button, Group, Text } from "@mantine/core"
import { PlayerTrackNext } from "tabler-icons-react"
import { turn } from '../../Store/turns'
import * as Selection from '../../Store/selection'
import { store } from '../../Store'

interface ActionBarProps {
  playerColor: string
  style: React.CSSProperties
}

const ActionBar: React.FC<ActionBarProps> = (props) => {
  console.log("Rendering ActionBar")

  return <Group style={props.style}>
    <Button onClick={onClickNextTurn} rightIcon={<PlayerTrackNext size={10} />} style={{backgroundColor: props.playerColor}}>Finish Turn</Button>
  </Group>
}

interface InfoBarProps {
  turn: number
  style: React.CSSProperties
}

const InfoBar: React.FC<InfoBarProps> = (props) => {
  console.log("Rendering InfoBar")

  store.useStore(['selection'])

  return <Group direction='column' style={props.style}>
    <Text>Turn Count: {props.turn}</Text>
    <Text>Selected Cell Position: {JSON.stringify(Selection.selectedCellPosition)}</Text>
    <Text>Selected Token: {Selection.selectedToken?.kind}</Text>
  </Group>
}

export const UI = (props) => {
  console.log("Rendering UI")

  store.useStore(['turns'])

  return <div>
    <InfoBar style={{position: 'absolute', right: '16px', top: '16px'}} turn={turn} />
    <ActionBar style={{position: 'absolute', left: '16px', top: '16px'}} playerColor={playerManager.getPlayerByIndex(turnManager.getTurn()).color} />
  </div>
}
