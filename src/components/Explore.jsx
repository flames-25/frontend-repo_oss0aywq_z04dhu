import { useEffect, useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function Explore() {
  const [retreats, setRetreats] = useState([])
  const [nature, setNature] = useState('')

  useEffect(() => { fetchRetreats() }, [])

  const fetchRetreats = async () => {
    const url = nature ? `${baseUrl}/api/retreats?nature_type=${nature}` : `${baseUrl}/api/retreats`
    try {
      const res = await fetch(url)
      const data = await res.json()
      setRetreats(data)
    } catch (e) { /* ignore */ }
  }

  useEffect(() => { fetchRetreats() }, [nature])

  return (
    <section id="explore" className="relative py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-emerald-900">Explore retreats</h2>
            <p className="text-emerald-800/80">A living map of experiences across deserts, forests, mountains, and seas.</p>
          </div>
          <div>
            <select value={nature} onChange={(e)=>setNature(e.target.value)} className="rounded-md border-emerald-800/20">
              <option value="">All natures</option>
              <option>ocean</option>
              <option>forest</option>
              <option>mountain</option>
              <option>desert</option>
              <option>jungle</option>
              <option>mixed</option>
            </select>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {retreats.map((r) => (
            <div key={r._id} className="group rounded-2xl overflow-hidden bg-white/70 backdrop-blur border border-emerald-900/10 shadow hover:shadow-lg transition">
              {r.image_url ? (
                <img src={r.image_url} alt={r.title} className="h-40 w-full object-cover" />
              ) : (
                <div className="h-40 w-full bg-gradient-to-br from-emerald-100 to-sky-100" />
              )}
              <div className="p-4">
                <div className="text-sm uppercase tracking-wide text-emerald-700/70">{r.nature_type}</div>
                <div className="text-lg font-semibold text-emerald-900">{r.title}</div>
                <div className="text-sm text-emerald-800/80">{r.duration_days} days • ${'{'}r.price_usd{'}'}</div>
                {Array.isArray(r.focus) && r.focus.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {r.focus.slice(0,3).map((f) => (
                      <span key={f} className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-900/10 text-emerald-800/80">{f}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {retreats.length === 0 && (
            <div className="col-span-full text-emerald-800/70">No retreats yet. Add some via the API to see them here.</div>
          )}
        </div>
      </div>
    </section>
  )
}
