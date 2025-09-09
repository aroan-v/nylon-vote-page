'use client'

import * as React from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'

import { cn } from '@/lib/utils'

function Switch({ className, ...props }) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'peer focus-visible:ring-ring focus-visible:ring-offset-background inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-teal-500 data-[state=unchecked]:bg-gray-200 dark:data-[state=checked]:bg-teal-600 dark:data-[state=unchecked]:bg-gray-700',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          'pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out',
          'data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0'
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
