'use client'
import React from 'react'
import { useNylonData } from '@/data/initializeNylonData'
import { useRecordedVotes } from '@/store/useRecordedVotes'
import PasswordPage from '../PasswordPage'

function ClientWrapper({ children }) {
  useNylonData()

  const addVote = useRecordedVotes((state) => state.addVote)
  React.useEffect(() => {
    const handleMessage = (event) => {
      if (!event.data) return

      if (event.data.type === 'vote') {
        addVote()
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [addVote])

  return (
    <>
      <PasswordPage>{children}</PasswordPage>
    </>
  )
}

export default ClientWrapper
