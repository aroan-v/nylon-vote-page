import React from 'react'
import { useDataStore } from '@/store/dataStore'
import { GENERAL_DETAILS } from './generalDetails'
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
      index.current = (index.current + 1) % localData.times.length

      HandleData({
        currentIndex: index.current,
        voteData: localData,
        stateSetter: setShallowState,
      })
    }, 3000)

    return () => clearInterval(intervalId)
  }, [localData, setShallowState])

  // Turn loading off
  React.useEffect(() => {
    if (!voteData) return

    setShallowState({
      isLoading: false,
    })
  }, [voteData, setShallowState])

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
      const alt = candidate ? candidate.alt : `Nylon poster of ${name} `

      return {
        name,
        src,
        alt,
        votes,
        delta: currentDelta[name] || 0,
      }
    })
    .sort((a, b) => b.votes - a.votes)
}

function HandleData({ currentIndex, voteData, stateSetter }) {
  const primaryPlayerDisplayName = GENERAL_DETAILS.primaryPlayerDisplayName
  const enemyPlayerDisplayName = GENERAL_DETAILS.enemyPlayerDisplayName

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

    // Get the delta (vote gained)
    const deltaData = CalculateDelta({
      previousData: previousParticipantData,
      currentData: currentParticipantData,
    })

    // Get the delta between primary player and the enemy player
    // Technically the enemy player shouldn't be locked to FYANG but since the Top 2 positions have been pretty much decided already, I've locked it in to her name.

    const totalRawDelta =
      Number(currentParticipantData[primaryPlayerDisplayName]) -
      Number(currentParticipantData[enemyPlayerDisplayName])

    devLog('totalRawDelta', totalRawDelta)
    devLog('primaryPlayerDisplayName', primaryPlayerDisplayName)
    devLog('currentParticipantData[Will]', currentParticipantData[primaryPlayerDisplayName])

    const currentTime = voteData.times[currentIndex]

    devLog('deltaData', deltaData)
    devLog('currentParticipantData', currentParticipantData)
    devLog('previousParticipantData', previousParticipantData)
    devLog('currentTime', currentTime)

    stateSetter({
      voteData,
      isPrimaryPlayerLeading: totalRawDelta > 0,
      gapBetweenPrimaryAndEnemy: Math.abs(totalRawDelta),
      processedData: ProcessParticipantsData({
        currentData: currentParticipantData,
        currentDelta: deltaData,
      }),
    })
  }
}
