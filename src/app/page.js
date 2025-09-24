'use client'
import styled, { keyframes } from 'styled-components'
import VotingSection from '@/components/VotingSection'
import PersonalVoteStats from '@/components/PersonalVoteStats'
import GapCounterSection from '@/components/GapCounterSection'
import HotRightNowMini from '@/components/HotRightNowMini'
import React from 'react'

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
  return (
    <>
      <section className="r mx-auto grid justify-items-center gap-6 lg:w-fit lg:grid-cols-3">
        <PersonalVoteStats />

        <div className="flex max-h-[400px] min-h-[350px] flex-col gap-6">
          <GapCounterSection useImage={true} />
          <VoteDashboardCard />
        </div>

        <HotRightNowMini />
      </section>
      <VotingSection />
    </>
  )
}

function VoteDashboardCard() {
  return (
    <div className="flex h-full max-w-sm flex-col justify-center gap-3 overflow-hidden rounded-xl bg-indigo-500/30 p-4 text-center text-white">
      {/* Body */}

      <p className="text-sm leading-tight">
        Watch how our <span className="font-semibold">votes and momentum</span> rose and fell
        throughout the journey — a look back at every step that led us to the final placements.
      </p>

      {/* CTA Button */}
      <a
        href="https://nylon-boldest-breakout-star-will.vercel.app"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 px-2 py-2 text-lg font-semibold text-black shadow-md transition-all duration-300 hover:scale-102 hover:shadow-[0_0_20px_rgba(255,215,0,0.7)]"
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
