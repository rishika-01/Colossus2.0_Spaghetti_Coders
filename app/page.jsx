'use client'
import { useState } from 'react'
import QRScanner from '../components/QRScanner'
import { useRouter } from 'next/navigation'

export default function Home() {
  const [upiLink, setUpiLink] = useState('')
  const router = useRouter()

  const handleSubmit = () => {
    if (upiLink.trim()) {
      let fullLink = upiLink.includes('upi://pay?') ? upiLink : `upi://pay?pa=${upiLink.trim()}`;
      router.push(`/result?upi=${encodeURIComponent(fullLink)}`);
    }
  };
  

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">RedTransact</h1>

      <QRScanner onScan={setUpiLink} />

      <p className="text-sm text-gray-500 mt-2">
        or paste your UPI link manually below
      </p>

      <input
        type="text"
        placeholder="Paste UPI Link"
        value={upiLink}
        onChange={(e) => setUpiLink(e.target.value)}
        className="border mt-4 p-2 w-full"
      />

      <button
        onClick={handleSubmit}
        className="bg-red-600 text-white px-4 py-2 mt-2"
      >
        Check Risk
      </button>
    </main>
  )
}
