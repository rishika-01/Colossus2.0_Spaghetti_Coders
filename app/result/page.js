'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const upiParam = searchParams.get('upi');
  const [upiID, setUpiID] = useState('');
  const [result, setResult] = useState(null);
  const [reportMsg, setReportMsg] = useState('');

  // Extract UPI ID (pa=...) from full UPI link
  useEffect(() => {
    if (!upiParam) return;

    try {
      const url = new URL(upiParam);
      const pa = url.searchParams.get('pa');
      setUpiID(pa || upiParam); // fallback to upiParam if it's a plain ID
    } catch (err) {
      console.error("❌ Invalid UPI link format:", err);
      setUpiID(upiParam); // fallback to raw input
    }
  }, [upiParam]);

  // Fetch from backend when upiID is ready
  useEffect(() => {
    if (!upiID) return;

    fetch('http://127.0.0.1:8000/check_upi/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ upi_id: upiID }),
    })
      .then(res => res.json())
      .then(data => {
        setResult(data);
      })
      .catch(err => {
        console.error('❌ Backend fetch failed:', err);
      });
  }, [upiID]);

  const getRiskLabel = (score) => {
    if (score >= 75) return '⚠️ High Risk';
    if (score >= 40) return '⚠️ Moderate Risk';
    return '✅ Low Risk';
  };

  const getColor = (score) => {
    if (score >= 75) return 'text-red-500';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const handleProceed = () => {
    alert('Would open UPI app with prefilled info (todo)');
  };

  const handleReport = () => {
    fetch('http://127.0.0.1:8000/report_upi/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ upi_id: upiID }),
    })
      .then(res => res.json())
      .then(data => {
        setReportMsg(data.status || 'UPI ID reported.');
      })
      .catch(err => {
        console.error('❌ Report failed:', err);
      });
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 space-y-4 text-white">
      <h1 className="text-3xl font-bold text-red-500">Scan Result</h1>

      {result ? (
        <>
          <p><strong>UPI ID:</strong> {result.upi_id}</p>
          <p className={`mt-2 text-xl font-semibold ${getColor(result.risk_score)}`}>
            🧠 Risk Score: {result.risk_score} – {getRiskLabel(result.risk_score)}
          </p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={handleProceed}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Proceed to UPI App
            </button>
            <button
              onClick={handleReport}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Report This
            </button>
          </div>

          {reportMsg && (
            <p className="mt-4 text-sm text-yellow-300">{reportMsg}</p>
          )}
        </>
      ) : (
        <p>No UPI link found or failed to fetch.</p>
      )}
    </main>
  );
}
