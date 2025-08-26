import React from 'react'
import { Button } from '../ui/button'
import PollEmbed from '../PollEmbed'

export default function VotingSection() {
  // State controlling scale for all PollEmbed instances
  const [scale, setScale] = React.useState(1)

  // Handlers with min/max limits
  const increment = () => setScale((s) => Math.min(s + 0.1, 1)) // max 2x
  const decrement = () => setScale((s) => Math.max(s - 0.1, 0.2)) // min 0.5x

  return (
    <section className="bg-neutral flex flex-col items-center justify-center gap-2">
      {/* Scale controls */}
      <div className="flex items-center gap-2">
        <Button onClick={decrement} variant="outline">
          -
        </Button>
        <span className="px-3 font-bold text-cyan-400">{(scale * 100).toFixed(0)}%</span>
        <Button onClick={increment} variant="outline">
          +
        </Button>
      </div>

      {/* Poll embeds */}
      <div className="flex flex-wrap items-center justify-center">
        <PollEmbed scale={scale} />
        <PollEmbed scale={scale} />
        <PollEmbed scale={scale} />
        <PollEmbed scale={scale} />
        <PollEmbed scale={scale} />
      </div>
      <div className="space-y-3 p-4 text-center text-sm">
        <p>
          If there are no math questions, switch to a different browser{' '}
          <span className="font-bold text-amber-500">(e.g., Chrome, Firefox, Safari)</span> or{' '}
          <span className="font-bold text-teal-400">wait for a full minute</span>.
        </p>
        <p>
          Trying to vote again too early will{' '}
          <span className="font-bold text-red-500">reset the cooldown</span>. Hands off completely,
          or use a different browser.
        </p>
      </div>
    </section>
  )
}
