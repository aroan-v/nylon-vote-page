import React from 'react'
import { Button } from '../ui/button'
import PollEmbed from '../PollEmbed'

export default function VotingSection() {
  // State controlling scale for all PollEmbed instances
  const [scale, setScale] = React.useState(0.3)
  const [refreshKey, setRefreshKey] = React.useState(Date.now())

  // Handlers with min/max limits
  const increment = () => setScale((s) => Math.min(s + 0.1, 1)) // max 2x
  const decrement = () => setScale((s) => Math.max(s - 0.1, 0.2)) // min 0.5x

  return (
    <section className="bg-neutral flex flex-col items-center justify-center gap-8">
      <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 p-2">
        {/* The main control panel container */}

        <p className="space-y-1 text-center text-sm font-semibold text-red-500">
          <span className="block">🚨 Please avoid refreshing the entire website frequently!</span>
          <span className="block font-bold text-teal-400">
            Instead, use the Refresh Polls 🔄 button below
          </span>
          <span className="block font-bold text-amber-400">
            Use the zoom controls to change the size of the polls!
          </span>
        </p>
        <div className="flex items-center gap-4 rounded-xl bg-teal-800/30 p-4 shadow-2xl">
          {/* Scale controls */}

          <div className="flex items-center gap-2">
            <Button
              onClick={decrement}
              variant="outline"
              className="h-10 w-10 rounded-lg border-neutral-700 bg-neutral-800 text-lg text-white transition-colors duration-200 hover:bg-neutral-700"
            >
              -
            </Button>
            <div className="flex flex-col text-center">
              <span className="min-w-[60px] text-center font-mono text-xs font-bold text-white">
                Zoom
              </span>
              <span className="min-w-[60px] text-center font-mono text-xl font-bold text-white">
                {(scale * 100).toFixed(0)}%
              </span>
            </div>
            <Button
              onClick={increment}
              variant="outline"
              className="h-10 w-10 rounded-lg border-neutral-700 bg-neutral-800 text-lg text-white transition-colors duration-200 hover:bg-neutral-700"
            >
              +
            </Button>
          </div>

          {/* Vertical separator */}
          <div className="h-8 w-px bg-white" />

          {/* Refresh polls button */}
          <Button
            key={refreshKey}
            onClick={() => {
              setRefreshKey(Date.now())
            }}
            variant="outline"
            className="rounded-lg border-neutral-700 bg-neutral-800 px-4 py-2 text-white transition-colors duration-200 hover:bg-neutral-700"
          >
            <span className="flex items-center gap-2">
              Refresh Polls
              <span className="text-xl">🔄</span>
            </span>
          </Button>
        </div>
      </div>
      {/* Poll embeds */}
      <div className="flex flex-wrap justify-center">
        <PollEmbed remountKey={refreshKey + '-1'} scale={scale} />
        <PollEmbed remountKey={refreshKey + '-2'} scale={scale} />
        <PollEmbed remountKey={refreshKey + '-3'} scale={scale} />
        <PollEmbed remountKey={refreshKey + '-4'} scale={scale} />
        <PollEmbed remountKey={refreshKey + '-5'} scale={scale} />
      </div>
      <div className="bg-card/70 max-w-sm space-y-4 rounded-lg p-6 text-center text-sm shadow-lg">
        <h2 className="text-2xl font-semibold">FAQ</h2>
        <ul className="list-disc space-y-4 pl-5 text-left text-sm">
          <li>
            If no math questions appear, try switching to a different browser{' '}
            <span className="font-bold text-amber-500">
              (e.g., Chrome, Firefox, Safari—not just tabs)
            </span>{' '}
            or <span className="font-bold text-teal-400">wait a full minute</span>.
          </li>
          <li>
            Voting too early will{' '}
            <span className="font-bold text-red-500">reset your cooldown</span>.
            <br />
            Give it a full pause or try a different browser.
          </li>
          <li>
            Still no math questions? Switch to your{' '}
            <span className="font-bold text-nowrap text-purple-500">mobile data</span>. Wait for 1 -
            2 hours before going back to your Wifi.
          </li>
        </ul>
      </div>
    </section>
  )
}
