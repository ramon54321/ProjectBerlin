import * as React from 'react'
import { database, onClickNextTurn } from '../../Logic'

// export class UI extends React.Component {
//   render(): React.ReactNode {
//       return <div style={{position: "absolute", top: "16px", left: "16px"}}>
//         <button onClick={onClickNextTurn}>Next Turn</button>
//         <button>World</button>
//         <span>Token Count: {5}</span>
//       </div>
//   }
// }

export const UI: React.FC = (props) => {
  console.log("Rendering UI")
  return <div style={{position: "absolute", top: "16px", left: "16px"}}>
    <button onClick={onClickNextTurn}>Next Turn</button>
    <button>World</button>
    <span>Token Count: {database.getCollection("tokens").find().length}</span>
  </div>
}