import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function smoothScrollTo(targetId: string | number, duration = 1500) {
  if (typeof window === 'undefined') return

  const start = window.scrollY
  let target = 0

  if (typeof targetId === "string") {
    const element = document.querySelector(targetId)
    if (!element) return
    target = element.getBoundingClientRect().top + window.scrollY
  } else {
    target = targetId
  }

  const distance = target - start
  let startTime: number | null = null

  function animation(currentTime: number) {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime

    // Ease Out Quart
    const ease = (t: number, b: number, c: number, d: number) => {
      t /= d
      t--
      return -c * (t * t * t * t - 1) + b
    }

    const run = ease(timeElapsed, start, distance, duration)
    window.scrollTo(0, run)

    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    } else {
      window.scrollTo(0, target)
    }
  }

  requestAnimationFrame(animation)
}
