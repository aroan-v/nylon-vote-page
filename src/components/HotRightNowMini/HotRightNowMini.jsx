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

function HotRightNowMini() {
  const allParticipantsData = useDataStore((state) => state.allParticipantsData)
  const isLoading = useDataStore((state) => state.isLoading)
  const lastApiUpdate = useDataStore((state) => state.lastApiUpdate)
  const baselineTime = useDataStore((state) => state.baselineTime)
  const countdown = useVoteStore((state) => state.countdown)

  // 🔥 local state to toggle
  const [showTopOnly, setShowTopOnly] = React.useState(false)

  // find greatest gainer
  const greatestGainer = Math.max(
    ...(allParticipantsData ?? []).map((p) => p.deltaFromBaseline || 0)
  )

  // check if more than one participant has the top delta
  const moreThanOneGainer =
    (allParticipantsData ?? []).filter((p) => p.deltaFromBaseline === greatestGainer).length > 1

  // ✂️ apply slicing depending on state
  const displayedData = showTopOnly
    ? (allParticipantsData ?? []).slice(0, 2)
    : (allParticipantsData ?? [])

  return (
    <SectionContainer className="h-[350px] w-full max-w-sm justify-start overflow-scroll border-2 border-indigo-700 p-2">
      {/* Toggle Button */}
      {/* <div className="flex items-center justify-end gap-2 p-2">
        <Label htmlFor="showTopOnly" className="text-sm">
          {showTopOnly ? 'Show top 2 only' : 'Show all'}
        </Label>
        <Switch
          id="showTopOnly"
          checked={showTopOnly}
          onCheckedChange={() => setShowTopOnly((prev) => !prev)}
        />
      </div> */}

      <Header lastApiUpdate={lastApiUpdate} lastSnapshotDate={baselineTime} countdown={countdown} />

      {/* Loading skeletons */}
      {isLoading &&
        (showTopOnly
          ? GENERAL_DETAILS.candidateNames?.slice(0, 2).map((_, i) => <HotCardSkeleton key={i} />)
          : GENERAL_DETAILS.candidateNames?.map((_, i) => <HotCardSkeleton key={i} />))}

      {/* Participant cards */}
      {displayedData.map(({ name, src, votes, deltaFromBaseline }, index) => (
        <HotCardMini
          key={name}
          isHot={deltaFromBaseline === greatestGainer && greatestGainer > 0 && !moreThanOneGainer}
          name={name}
          placement={index + 1}
          src={src}
          votes={votes}
          gains={deltaFromBaseline}
        />
      ))}
    </SectionContainer>
  )
}

export default HotRightNowMini

function Header({ lastSnapshotDate, lastApiUpdate, countdown = '' }) {
  return (
    <p className="pt-0 text-center text-sm italic">Tracking votes gained at random intervals.</p>
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
