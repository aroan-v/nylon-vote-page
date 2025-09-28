import React from 'react'
import SectionContainer from '../SectionContainer'
import HotCardMini from '../HotCardMini'
import { HotCardSkeleton } from '../HotRightNowSection'
import useVoteStore from '@/store/useVoteStore'

import { useDataStore } from '@/store/dataStore'
import { GENERAL_DETAILS } from '@/data/generalDetails'
import { devLog } from '@/lib/logger'

function HotRightNowMini() {
  const isLoading = useVoteStore((state) => state.isLoading)
  const lastApiUpdate = useDataStore((state) => state.lastApiUpdate)
  const baselineTime = useDataStore((state) => state.baselineTime)
  const processedData = useVoteStore((s) => s.processedData)

  devLog('processedData', processedData)

  // find greatest gainer
  const greatestGainer = Math.max(...(processedData ?? []).map((p) => p.delta || 0))

  // check if more than one participant has the top delta
  const moreThanOneGainer =
    (processedData ?? []).filter((p) => p.delta === greatestGainer).length > 1

  return (
    <SectionContainer className="max-h-[400px] min-h-[350px] w-full max-w-sm justify-start overflow-scroll border-3 border-indigo-700 p-2">
      <Header lastApiUpdate={lastApiUpdate} lastSnapshotDate={baselineTime} />

      {/* Loading skeletons */}
      {isLoading && GENERAL_DETAILS.candidateNames?.map((_, i) => <HotCardSkeleton key={i} />)}

      {/* Participant cards */}
      {!isLoading &&
        processedData.map(({ name, src, alt, votes, delta }, index) => (
          <HotCardMini
            key={name}
            isHot={delta === greatestGainer && greatestGainer > 0 && !moreThanOneGainer}
            name={name}
            placement={index + 1}
            src={src}
            alt={alt}
            votes={votes}
            gains={delta}
          />
        ))}
    </SectionContainer>
  )
}

export default HotRightNowMini

function Header({}) {
  return (
    <p className="pt-0 text-center text-sm italic">
      Showing 5-minute vote snapshots every 3 seconds
    </p>
  )
}
