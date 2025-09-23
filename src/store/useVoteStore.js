// useVoteStore.js
import { create } from 'zustand'

const useVoteStore = create((set) => ({
  countdown: 120,
  voteData: null,
  processedData: [],

  setShallowState: (partial) =>
    set((state) => ({
      ...state,
      ...partial,
    })),
  setCountdown: (value) => set({ countdown: value }),
}))

export default useVoteStore
