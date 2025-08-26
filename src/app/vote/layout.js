'use client'

import PasswordPage from '@/components/PasswordPage'

export default function ChildLayout({ children }) {
  return (
    <>
      <PasswordPage>{children}</PasswordPage>
    </>
  )
}
