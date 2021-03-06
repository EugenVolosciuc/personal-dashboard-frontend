import React, { useEffect } from 'react'

export default function useIntersectionObserver({
  root,
  target,
  onIntersect,
  threshold = .5,
  rootMargin = '0px',
  enabled = true,
}) {

  useEffect(() => {
    if (!enabled) {
      return
    }

    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        console.log("ENTRY!", entry)
        entry.isIntersecting && onIntersect()
      }),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    )

    const el = target && target.current

    if (!el) {
      return
    }

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [target.current, enabled])
}
