import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import TimeSky from './components/TimeSky'
import ParallaxLeaves from './components/ParallaxLeaves'
import AISpirit from './components/AISpirit'
import Explore from './components/Explore'

function useAmbientAudio() {
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    let audio
    if (enabled) {
      audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_7d1c0e40b7.mp3?filename=forest-meditation-ambient-110624.mp3')
      audio.loop = true
      audio.volume = 0.35
      const play = () => audio.play().catch(() => {})
      play()
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') play()
        else audio.pause()
      })
    }
    return () => { if (audio) audio.pause() }
  }, [enabled])
  return { enabled, setEnabled }
}

function App() {
  const { enabled, setEnabled } = useAmbientAudio()

  return (
    <div className="relative min-h-screen overflow-x-hidden text-emerald-950">
      <TimeSky />
      <Hero />
      <ParallaxLeaves />

      <div className="relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mt-6 flex items-center gap-3 bg-white/60 backdrop-blur rounded-full w-fit px-4 py-2 border border-emerald-900/10 shadow">
            <button onClick={() => setEnabled(!enabled)} className="text-sm">
              {enabled ? 'Pause ambient forest' : 'Play ambient forest'}
            </button>
          </div>
        </div>

        <AISpirit />
        <Explore />

        <footer className="py-16 text-center text-emerald-800/70">
          Breathe. Listen. Belong.
        </footer>
      </div>
    </div>
  )
}

export default App
