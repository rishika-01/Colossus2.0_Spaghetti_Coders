'use client'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function ReportsPage() {
  const [reports, setReports] = useState([])

  useEffect(() => {
    const fetchReports = async () => {
      const q = query(collection(db, 'reports'), orderBy('reportedAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      setReports(data)
    }

    fetchReports()
  }, [])

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-red-500">🚩 Scam Reports</h1>
      {reports.length === 0 ? (
        <p className="text-gray-400">No reports yet.</p>
      ) : (
        <div className="bg-black text-white border border-gray-700 rounded p-4">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="pb-2">UPI ID</th>
                <th className="pb-2">Reported At</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="border-t border-gray-800">
                  <td className="py-2">{r.upi}</td>
                  <td className="py-2">
                    {new Date(r.reportedAt.seconds * 1000).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  )
}
