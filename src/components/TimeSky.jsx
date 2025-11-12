import { useMemo } from 'react'

function getGradientByHour(h) {
  // Dawn 5-7, Morning 8-11, Noon 12-15, Sunset 16-19, Night 20-4
  if (h >= 5 && h <= 7) return 'from-rose-100 via-sky-200 to-emerald-100'
  if (h >= 8 && h <= 11) return 'from-sky-100 via-emerald-100 to-amber-100'
  if (h >= 12 && h <= 15) return 'from-sky-200 via-white to-amber-100'
  if (h >= 16 && h <= 19) return 'from-amber-200 via-rose-200 to-indigo-200'
  return 'from-indigo-900 via-slate-900 to-black'
}

export default function TimeSky({ className = '' }) {
  const hour = new Date().getHours()
  const gradient = useMemo(() => getGradientByHour(hour), [hour])

  return (
    <div className={`fixed inset-0 -z-0 bg-gradient-to-b ${gradient} transition-colors duration-700 ${className}`} />
  )
}
