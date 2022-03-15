import Loki from 'lokijs'

export const database = new Loki("mydb")

import { configureStore } from "@reduxjs/toolkit"
import turnsReducer from "./turns"
import tokensReducer from "./tokens"

export const store = configureStore({
  reducer: {
    turns: turnsReducer,
    tokens: tokensReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch