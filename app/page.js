'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [upiLink, setUpiLink] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (upiLink.trim() === '') return;
    router.push(`/result?upi=${encodeURIComponent(upiLink)}`);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-red-500">RedTransact 🚨</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Paste UPI link here"
          value={upiLink}
          onChange={(e) => setUpiLink(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded w-full"
        >
          Check for Scam
        </button>
      </form>
    </main>
  );
}
