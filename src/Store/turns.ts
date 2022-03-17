import { store } from '.'

export let turn = 0

const { actions } = store.addSlice('turns', {
  increment: () => turn++
})

export const { increment } = actions
