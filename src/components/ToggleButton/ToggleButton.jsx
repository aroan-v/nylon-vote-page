import React from 'react'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'
cn

export default function ToggleButton({
  leftLabel = 'Left',
  rightLabel = 'Right',
  checked,
  onToggle,
  leftLabelStyle,
  rightLabelStyle,
  wrapperStyle,
}) {
  return (
    <div className={cn('flex gap-2', wrapperStyle)}>
      {/* Left label */}
      <Label htmlFor="toggle-switch" className={cn('', leftLabelStyle)}>
        {leftLabel}
      </Label>

      {/* Generic Switch */}
      <Switch id="toggle-switch" checked={checked} onCheckedChange={onToggle} />

      {/* Right label */}
      <Label htmlFor="toggle-switch" className={rightLabelStyle}>
        {rightLabel}
      </Label>
    </div>
  )
}
