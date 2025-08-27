'use client'
import { useDataStore } from '@/store/dataStore'
import styled, { keyframes } from 'styled-components'
import VotingSection from '@/components/VotingSection'
import PersonalVoteStats from '@/components/PersonalVoteStats'
import GapCounterSection from '@/components/GapCounterSection'
import HotRightNowMini from '@/components/HotRightNowMini'

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

export default function Vote() {
  const allParticipantsData = useDataStore((state) => state.allParticipantsData)
  const lastSnapshotDate = useDataStore((state) => state.lastSnapshotDate)
  const lastApiUpdate = useDataStore((state) => state.lastApiUpdate)
  const hasData = allParticipantsData && lastSnapshotDate && lastApiUpdate
  const recordedVotes = useDataStore((state) => state.recordedVotes)

  return (
    <div className="flex flex-col items-center space-y-8 pb-20 font-sans">
      <div className=""></div>

      <div className="flex w-full flex-wrap justify-center gap-8">
        <PersonalVoteStats />
        <div className="flex h-[350px] max-w-sm flex-col space-y-6 overflow-hidden">
          {/* Gap counter section */}
          <GapCounterSection useImage={true} className="w-full" />

          {/* Scrollable instructions container */}
          <div className="bg-card/50 flex-sh w-full flex-1 overflow-auto rounded-xl border-2 border-blue-500 p-4">
            <div className="flex flex-col gap-4">
              {/* Voting instructions card */}
              <h2 className="text-md text-center font-bold text-gray-900 dark:text-gray-100">
                Voting Guide
              </h2>
              <ul className="list-inside list-decimal space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>
                  Vote 5 times, then switch to a different browser (e.g., Chrome, Firefox, Safari).
                </li>
                <li>Votes without answered math questions aren’t counted.</li>
              </ul>
            </div>
          </div>
        </div>

        <HotRightNowMini />
      </div>
      <div className="space-y-4">
        <VotingSection />
      </div>

      <Attribution />
    </div>
  )
}

function Header({ lastSnapshotDate, lastApiUpdate }) {
  return (
    <p className="p-2 pt-0 text-center italic">
      <span className="font-bold text-red-500">Top Gainer</span> gained{' '}
      <span className="">
        the most votes from {/* Use the FlashingSpan component with a key */}
        <FlashingSpan key={lastSnapshotDate}>{lastSnapshotDate}</FlashingSpan> to{' '}
        {/* Use the FlashingSpan component with a key */}
        <span className="text-nowrap">
          <FlashingSpan key={lastApiUpdate}>{lastApiUpdate}</FlashingSpan> (PH Time)
        </span>
      </span>
    </p>
  )
}

function HeaderSkeleton() {
  return (
    <p className="p-2 pt-0 text-center italic">
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

function Attribution() {
  return (
    <div className="mx-auto">
      <p className="text-s text-center text-gray-500 italic">
        Made with love by{' '}
        <a
          href="https://x.com/sovereignswifts"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-300 hover:underline"
        >
          @SovereignSwifts
        </a>{' '}
        🩵🩷
        <br />
        Message me in X / Twitter if there are bugs / problems.
      </p>
    </div>
  )
}
