// useVoteStore.js
import { create } from 'zustand'

const useVoteStore = create((set) => ({
  countdown: 120, // start with 2 minutes (120s)
  setCountdown: (value) => set({ countdown: value }),
}))

export default useVoteStore
