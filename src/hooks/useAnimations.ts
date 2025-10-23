import { useEffect, useRef } from 'react'
import { createStaggeredDelay } from '../utils/animations'

export function useStaggeredAnimation(items: any[], baseDelay: number = 0.1) {
  const refs = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    refs.current.forEach((element, index) => {
      if (element) {
        const delay = createStaggeredDelay(index, baseDelay)
        Object.assign(element.style, delay)
      }
    })
  }, [items, baseDelay])

  return refs
}

export function useIntersectionObserver(
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = {}
) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(callback, {
      threshold: 0.1,
      ...options
    })

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [callback, options])

  return ref
}








