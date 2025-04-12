'use client'
import { useState } from 'react'
import QRScanner from '../components/QRScanner'
import { useRouter } from 'next/navigation'
import Head from 'next/head'
import { motion } from 'framer-motion'

export default function Home() {
  const [upiLink, setUpiLink] = useState('')
  const [showScanner, setShowScanner] = useState(false)
  const router = useRouter()

  const handleSubmit = () => {
    if (upiLink.trim()) {
      const fullLink = upiLink.includes('upi://pay?')
        ? upiLink
        : `upi://pay?pa=${upiLink.trim()}`
      router.push(`/result?upi=${encodeURIComponent(fullLink)}`)
    }
  }

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main
        className="min-h-screen bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-zinc-700 via-gray-800 to-black flex flex-col items-center justify-center p-6 text-white transition duration-300 hover:bg-black"
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {/* Background Orbs */}
        <div className="absolute w-[400px] h-[400px] bg-red-600 rounded-full blur-3xl opacity-30 -z-10 top-10 left-10 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-white rounded-full blur-2xl opacity-20 -z-10 bottom-10 right-10 animate-pulse"></div>

        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold mb-6"
        >
          <span className="text-red-600">Red</span>
          <span className="text-white">Transact</span>
        </motion.h1>

        <div className="flex gap-4 mb-4">
          <button
            onClick={() => setShowScanner(true)}
            className="bg-gray-700 hover:bg-red-600 transition px-4 py-2 rounded"
          >
            QR Scanner
          </button>
          <button
            onClick={() => setShowScanner(false)}
            className="bg-gray-700 hover:bg-red-600 transition px-4 py-2 rounded"
          >
            UPI ID
          </button>
        </div>

        {showScanner && (
          <div className="mb-4 border border-gray-600 p-2 rounded">
            <QRScanner onScan={setUpiLink} />
          </div>
        )}

        <p className="text-sm text-gray-400 mt-3">
          or paste your UPI link manually below
        </p>

        <input
          type="text"
          placeholder="Paste UPI Link"
          value={upiLink}
          onChange={(e) => setUpiLink(e.target.value)}
          className="border border-gray-600 mt-4 p-2 w-full bg-black text-white rounded"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-semibold px-6 py-2 mt-4 rounded-full w-full shadow-lg hover:shadow-red-500/50"
        >
          Check Risk
        </motion.button>
      </main>
    </>
  )
}
