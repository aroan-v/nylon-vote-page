import React from 'react'
import { API } from './api'
import fetcher from '@/lib/fetcher'
import { useDataStore } from '@/store/dataStore'
import { GENERAL_DETAILS } from './generalDetails'
import getPhTime from '@/lib/getPhTime'
import { convertToPhTime } from '@/lib/convertToPhTime'
import { useRecordedVotes } from '@/store/useRecordedVotes'
import useVoteStore from '@/store/useVoteStore'
import { devLog } from '@/lib/logger'
import { findNearestIndex } from '@/lib/findNearestIndex'

let lastSavedTime = null
let latestVersion = null

export function useNylonData() {
  const setState = useDataStore((state) => state.setState)
  const hydrate = useRecordedVotes((state) => state.hydrate)
  const setCountdown = useVoteStore((state) => state.setCountdown)
  const setShallowState = useVoteStore((s) => s.setShallowState)
  const voteData = useVoteStore((s) => s.voteData)

  const lastVoteSnapshotRef = React.useRef(null)
  const baselineRef = React.useRef({
    time: Date.now(),
    votes: null,
  })

  const [localData, setLocalData] = React.useState(null)

  const index = React.useRef(0)

  React.useEffect(() => {
    if (!localData) return

    const now = new Date()
    devLog('now', now)

    // Get the index that matches the local time
    const { currentIndex } = findNearestIndex({
      timestamps: localData.times,
      currentDate: now,
    })

    index.current = currentIndex

    const intervalId = window.setInterval(() => {
      // Increment the index by 1 as long as it hasn't exceeded the length
      if (index.current < localData.times.length - 1 && index.current !== 0) {
        index.current = index.current + 1
      } else {
        index.current = 0
      }

      HandleData({
        currentIndex: index.current,
        voteData: localData,
        stateSetter: setShallowState,
      })
    }, 3000)

    return () => clearInterval(intervalId)
  }, [localData, setShallowState])

  React.useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/votes')
        if (!res.ok) throw new Error('Failed to fetch votes')
        const data = await res.json()

        devLog('data', data)
        setLocalData(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
  }, [setShallowState])
}

function GetParticipantData({ data, targetIndex }) {
  const participantData = {}
  for (const key in data.voteIncrements) {
    devLog('key', key)

    participantData[key] = data.voteIncrements[key][targetIndex]
  }

  return participantData
}

function CalculateDelta({ previousData, currentData }) {
  let delta = {}
  for (const key in previousData) {
    if (currentData[key]) {
      delta[key] = currentData[key] - previousData[key]
    }
  }

  return delta
}

function ProcessParticipantsData({ currentData, currentDelta }) {
  return Object.entries(currentData)
    .map(([name, votes]) => {
      const candidate = GENERAL_DETAILS.candidateProperties.find(
        ({ name: pName }) => pName === name
      )

      const src = candidate ? candidate.src : null

      return {
        name,
        src,
        votes,
        delta: currentDelta[name] || 0,
      }
    })
    .sort((a, b) => b.votes - a.votes)
}

function HandleData({ currentIndex, voteData, stateSetter }) {
  if (voteData) {
    devLog('voteData', voteData)

    devLog('currentIndex', currentIndex)

    // Get the data based on time slot
    const currentParticipantData = GetParticipantData({
      data: voteData,
      targetIndex: currentIndex,
    })

    const previousParticipantData = GetParticipantData({
      data: voteData,
      targetIndex: Math.max(currentIndex - 1, 0),
    })

    // Get the delta

    const deltaData = CalculateDelta({
      previousData: previousParticipantData,
      currentData: currentParticipantData,
    })

    const currentTime = voteData.times[currentIndex]

    devLog('deltaData', deltaData)
    devLog('currentParticipantData', currentParticipantData)
    devLog('previousParticipantData', previousParticipantData)
    devLog('currentTime', currentTime)

    stateSetter({
      voteData,
      processedData: ProcessParticipantsData({
        currentData: currentParticipantData,
        currentDelta: deltaData,
      }),
    })
  }
}
