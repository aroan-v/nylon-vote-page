'use client'
import VotingSection from '@/components/VotingSection'
import PersonalVoteStats from '@/components/PersonalVoteStats'
import GapCounterSection from '@/components/GapCounterSection'
import HotRightNowMini from '@/components/HotRightNowMini'
import React from 'react'

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
