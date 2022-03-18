import { store } from '.'

export let selectedCellPosition = undefined
export let selectedToken = undefined

const { actions } = store.addSlice('selection', {
  selectCell: (position) => selectedCellPosition = position,
  selectToken: (token) => {
    selectedToken = token
  },
  deselectAll: () => {
    selectedCellPosition = undefined
    selectedToken = undefined
  }
})

export const { selectCell, selectToken, deselectAll } = actions
