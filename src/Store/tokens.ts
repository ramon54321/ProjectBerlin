import { store, database } from '.'
import { HumveeToken, ObstructionToken, SquadToken, Token } from "../Logic/Token"

export const tokens = database.addCollection<Token>("tokens")

const { actions } = store.addSlice('tokens', {
  insert: (payload) => {
    switch (payload.kind) {
      case 'Obstruction':
        tokens.insert(new ObstructionToken(payload.x, payload.y))
        break;
      case 'Squad':
        tokens.insert(new SquadToken(payload.x, payload.y, payload.playerId))
        break;
      case 'Humvee':
        tokens.insert(new HumveeToken(payload.x, payload.y, payload.playerId))
        break;
      default:
        break;
    }
  },
  remove: (payload) => {
    tokens.remove(payload)
  }
})

export const { insert, remove } = actions
