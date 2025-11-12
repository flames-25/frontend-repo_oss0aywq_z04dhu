import { useState } from 'react'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export default function AISpirit() {
  const [form, setForm] = useState({ energy: 'calm', preferred_nature: 'ocean', budget: 1000, duration: 5, goals: '' })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  const runQuiz = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      setResult(data)
    } catch (e) {
      setResult({ error: e.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="quiz" className="relative py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-emerald-900">Meet your spirit guide</h2>
        <p className="mt-2 text-emerald-800/80">A gentle AI listens to your energy and suggests retreats and sanctuaries.</p>

        <div className="mt-8 grid md:grid-cols-2 gap-6 bg-white/70 backdrop-blur rounded-2xl p-6 shadow-lg ring-1 ring-emerald-900/5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-emerald-900">Energy</label>
              <select className="w-full rounded-md border-emerald-800/20" value={form.energy} onChange={(e)=>setForm({ ...form, energy: e.target.value })}>
                <option value="calm">Calm</option>
                <option value="transformative">Transformative</option>
                <option value="adventurous">Adventurous</option>
                <option value="restorative">Restorative</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-emerald-900">Preferred Nature</label>
              <select className="w-full rounded-md border-emerald-800/20" value={form.preferred_nature} onChange={(e)=>setForm({ ...form, preferred_nature: e.target.value })}>
                <option>ocean</option>
                <option>forest</option>
                <option>mountain</option>
                <option>desert</option>
                <option>jungle</option>
                <option>mixed</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-emerald-900">Budget (USD)</label>
                <input type="number" className="w-full rounded-md border-emerald-800/20" value={form.budget} onChange={(e)=>setForm({ ...form, budget: Number(e.target.value) })} />
              </div>
              <div>
                <label className="block text-sm text-emerald-900">Duration (days)</label>
                <input type="number" className="w-full rounded-md border-emerald-800/20" value={form.duration} onChange={(e)=>setForm({ ...form, duration: Number(e.target.value) })} />
              </div>
            </div>
            <div>
              <label className="block text-sm text-emerald-900">Goals</label>
              <textarea rows="3" className="w-full rounded-md border-emerald-800/20" value={form.goals} onChange={(e)=>setForm({ ...form, goals: e.target.value })} />
            </div>
            <button onClick={runQuiz} className="inline-flex items-center justify-center rounded-full bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 transition">
              {loading ? 'Listening...' : 'Ask the Spirit'}
            </button>
          </div>

          <div className="rounded-xl bg-emerald-50/70 p-5 border border-emerald-800/10 min-h-[200px]">
            {!result && <p className="text-emerald-900/80">Your guide will reply here with a message and suggestions.</p>}
            {result?.error && <p className="text-red-600">{result.error}</p>}
            {result?.spirit_message && (
              <div>
                <p className="text-emerald-900 text-lg">{result.spirit_message}</p>
                <div className="mt-4 space-y-3">
                  {(result.matches || []).map((r) => (
                    <div key={r._id} className="p-3 rounded-lg bg-white/70 border border-emerald-800/10">
                      <div className="font-semibold text-emerald-900">{r.title}</div>
                      <div className="text-sm text-emerald-800/80">{r.nature_type} • {r.duration_days} days • ${'{'}r.price_usd{'}'}</div>
                    </div>
                  ))}
                  {(result.matches || []).length === 0 && (
                    <p className="text-emerald-800/80">No matches yet. Try adjusting duration or budget.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
