'use client'
import { useDataStore } from '@/store/dataStore'
import styled, { keyframes } from 'styled-components'
import VotingSection from '@/components/VotingSection'
import PersonalVoteStats from '@/components/PersonalVoteStats'
import GapCounterSection from '@/components/GapCounterSection'
import HotRightNowMini from '@/components/HotRightNowMini'
import React from 'react'
import ToggleButton from '@/components/ToggleButton'
import TotalVotesSection from '@/components/TotalVotesSection'

const instantFlash = keyframes`
  0% { color: white; }
  1% { color: cyan; } 
  99% { color: cyan; } 
  100% { color: white; } 
`

const FlashingSpan = styled.span`
  display: inline-block;
  font-weight: 700;
  animation: ${instantFlash} 1.5s steps(1) forwards;
  /* 2.5s duration (2s hold + 0.5s for the instant on/off)
    steps(1) makes the animation jump to the next keyframe instantly
    forwards keeps the final state until the animation is re-triggered
  */
`

export default function VotePage() {
  const allParticipantsData = useDataStore((state) => state.allParticipantsData)
  const lastSnapshotDate = useDataStore((state) => state.lastSnapshotDate)
  const lastApiUpdate = useDataStore((state) => state.lastApiUpdate)
  const hasData = allParticipantsData && lastSnapshotDate && lastApiUpdate
  const recordedVotes = useDataStore((state) => state.recordedVotes)
  const [showGapCounter, setShowGapCounter] = React.useState(false)
  const [showHotRightNow, seShowHotRightNow] = React.useState(false)

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex w-full flex-wrap justify-center gap-8">
        <PersonalVoteStats />
        <div className="flex h-[350px] max-w-sm flex-col space-y-6 overflow-hidden">
          {/* Gap counter section */}
          <TotalVotesSection useImage={true} />

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

        <VoteDashboardCard />
        <HotRightNowMini />
      </div>
      <div className="flex flex-col items-center space-y-4">
        <div className="">
          <ToggleButton />
        </div>
        <VotingSection />
      </div>

      <Attribution />
    </div>
  )
}

function VoteDashboardCard() {
  return (
    <div className="max-w-sm self-start overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg">
      {/* Header */}
      <div className="px-6 py-4 text-center">
        <h2 className="text-2xl font-bold">Nylon Boldest Breakout Star</h2>
      </div>

      {/* Body */}
      <div className="space-y-4 px-6 pb-6 text-center">
        <p className="text-base leading-relaxed">
          Watch how our <span className="font-semibold">votes and momentum</span> rose and fell
          throughout the journey — a look back at every step that led us to the final placements.
        </p>

        {/* CTA Button */}
        <a
          href="https://nylon-boldest-breakout-star-will.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-5 py-3 text-lg font-semibold text-black shadow-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,215,0,0.7)]"
        >
          View Dashboard
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-2 h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 3h7m0 0v7m0-7L10 14"
            />
          </svg>
        </a>
      </div>
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
