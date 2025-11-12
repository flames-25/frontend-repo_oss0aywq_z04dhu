import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/poZi6bJ4-Htwt04i/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-white/0 pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold drop-shadow-[0_6px_24px_rgba(0,0,0,0.35)]"
        >
          The Sanctuary of Nature
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-4 max-w-2xl text-base md:text-lg text-white/90"
        >
          A digital oasis for healing journeys, mindful retreats, and living earth wisdom.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
          className="mt-8 flex flex-col sm:flex-row gap-3"
        >
          <a href="#quiz" className="bg-emerald-500/90 hover:bg-emerald-500 text-white px-6 py-3 rounded-full shadow-lg shadow-emerald-700/20 transition">
            Find your energy journey
          </a>
          <a href="#explore" className="bg-white/10 hover:bg-white/20 backdrop-blur px-6 py-3 rounded-full border border-white/30 transition">
            Explore retreats
          </a>
        </motion.div>
      </div>
    </section>
  )
}
