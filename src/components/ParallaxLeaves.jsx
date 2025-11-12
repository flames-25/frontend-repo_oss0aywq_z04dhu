import { useEffect, useRef } from 'react'

export default function ParallaxLeaves() {
  const ref = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const el = ref.current
      if (!el) return
      const { innerWidth: w, innerHeight: h } = window
      const x = (e.clientX - w / 2) / w
      const y = (e.clientY - h / 2) / h
      el.style.transform = `translate3d(${x * 20}px, ${y * 12}px, 0)`
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      <svg className="absolute top-10 left-10 opacity-30" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
        <path d="M12 2C10 8 6 10 2 12c4 2 8 4 10 10 2-6 6-8 10-10-4-2-8-4-10-10z" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-16 right-20 opacity-20" width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
        <circle cx="12" cy="12" r="10" fill="currentColor" />
      </svg>
    </div>
  )
}
