import React from 'react'
import SectionContainer from '../SectionContainer'
import styled, { keyframes } from 'styled-components'
import { HotCard } from '../HotRightNowSection'
import HotCardMini from '../HotCardMini'
import { HotCardSkeleton } from '../HotRightNowSection'
import { Label } from '../ui/label'
import useVoteStore from '@/store/useVoteStore'
import { Switch } from '../ui/switch'

const instantFlash = keyframes`
  0% { color: white; }
  1% { color: cyan; } /* Instant jump to orange */
  99% { color: cyan; } /* Hold orange for almost the entire duration */
  100% { color: white; } /* Instant return to white */
`

// Create the styled component with the new keyframes and timing
const FlashingSpan = styled.span`
  display: inline-block;
  font-weight: 700;
  animation: ${instantFlash} 1.5s steps(1) forwards;
  /* 2.5s duration (2s hold + 0.5s for the instant on/off)
    steps(1) makes the animation jump to the next keyframe instantly
    forwards keeps the final state until the animation is re-triggered
  */
`

import { useDataStore } from '@/store/dataStore'
import { GENERAL_DETAILS } from '@/data/generalDetails'
import { devLog } from '@/lib/logger'

function HotRightNowMini() {
  const isLoading = useVoteStore((state) => state.isLoading)
  const lastApiUpdate = useDataStore((state) => state.lastApiUpdate)
  const baselineTime = useDataStore((state) => state.baselineTime)
  const processedData = useVoteStore((s) => s.processedData)

  devLog('processedData', processedData)

  // local state to toggle
  const [showTopOnly, setShowTopOnly] = React.useState(false)

  // find greatest gainer
  const greatestGainer = Math.max(...(processedData ?? []).map((p) => p.delta || 0))

  // check if more than one participant has the top delta
  const moreThanOneGainer =
    (processedData ?? []).filter((p) => p.delta === greatestGainer).length > 1

  // apply slicing depending on state
  const displayedData = showTopOnly ? (processedData ?? []).slice(0, 2) : (processedData ?? [])

  return (
    <SectionContainer className="max-h-[400px] min-h-[350px] w-full max-w-sm justify-start overflow-scroll border-3 border-indigo-700 p-2">
      <Header lastApiUpdate={lastApiUpdate} lastSnapshotDate={baselineTime} />

      {/* Loading skeletons */}
      {isLoading && GENERAL_DETAILS.candidateNames?.map((_, i) => <HotCardSkeleton key={i} />)}

      {/* Participant cards */}
      {!isLoading &&
        processedData.map(({ name, src, votes, delta }, index) => (
          <HotCardMini
            key={name}
            isHot={delta === greatestGainer && greatestGainer > 0 && !moreThanOneGainer}
            name={name}
            placement={index + 1}
            src={src}
            votes={votes}
            gains={delta}
          />
        ))}
    </SectionContainer>
  )
}

export default HotRightNowMini

function Header({ lastSnapshotDate, lastApiUpdate, countdown = '' }) {
  return (
    <p className="pt-0 text-center text-sm italic">
      Showing 5-minute vote snapshots every 3 seconds
    </p>
  )

  return (
    <p className="p-6 pt-0 text-center italic">
      Tracking votes every 2 mins. <span className="font-bold text-red-500">Top Gainer</span> gained{' '}
      <span className="text-nowrap">
        the most votes from {/* Use the FlashingSpan component with a key */}
        <FlashingSpan key={lastSnapshotDate}>{lastSnapshotDate}</FlashingSpan> to{' '}
        {/* Use the FlashingSpan component with a key */}
      </span>
    </p>
  )
}

function HeaderSkeleton() {
  return (
    <p className="p-6 pt-0 text-center italic">
      The person with <span className="font-bold text-red-500">Top Gainer</span> gained{' '}
      <span className="text-nowrap">
        the most votes from {/* Skeleton for lastSnapshotDate */}
        <span className="mx-1 inline-block h-4 w-15 rounded bg-gray-300" />
        to {/* Skeleton for lastApiUpdate */}
        <span className="mx-1 inline-block h-4 w-15 rounded bg-gray-300" />
      </span>
    </p>
  )
}
