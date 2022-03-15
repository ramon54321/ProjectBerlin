import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { database } from "."
import { HumveeToken, ObstructionToken, SquadToken, Token } from "../Logic/Token"

const tokens = database.addCollection<Token>("tokens")

const tokensSlice = createSlice({
  name: "tokens",
  initialState: tokens.find(),
  reducers: {
    insert: (state, action: PayloadAction<{kind: 'Obstruction' | 'Squad' | 'Humvee', x: number, y: number, playerId?: number}>) => {
      console.log("RUnning insert reducer")
      switch (action.payload.kind) {
        case 'Obstruction':
          tokens.insert(new ObstructionToken(action.payload.x, action.payload.y))
          break;
        case 'Squad':
          tokens.insert(new SquadToken(action.payload.x, action.payload.y, action.payload.playerId))
          break;
        case 'Humvee':
          tokens.insert(new HumveeToken(action.payload.x, action.payload.y, action.payload.playerId))
          break;
        default:
          break;
      }
      return tokens.find()
    }
  }
})
export const { insert } = tokensSlice.actions

export default tokensSlice.reducer
