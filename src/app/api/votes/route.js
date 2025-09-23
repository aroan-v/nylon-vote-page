import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch(
      'https://raw.githubusercontent.com/aroan-v/nylon-biggest-breakout-star-cache/refs/heads/main/snapshots/2025-08-29.json'
    )

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch data from GitHub' },
        { status: res.status }
      )
    }

    const data = await res.json()

    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
