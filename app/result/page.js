'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResultPage() {
  const searchParams = useSearchParams();
  const upi = searchParams.get('upi');
  const [parsed, setParsed] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    if (!upi) return;
    const urlParams = new URLSearchParams(upi.split('?')[1]);
    const details = {
      id: urlParams.get('pa'),
      name: urlParams.get('pn'),
      amount: urlParams.get('am'),
    };
    setParsed(details);

    const keywords = ['fraud', 'scam', 'payu', 'verify', 'money', '123', 'ok'];
    let baseScore = 0;

    if (details.id) {
      keywords.forEach(word => {
        if (details.id.toLowerCase().includes(word)) {
          baseScore += 20;
        }
      });
      baseScore += Math.floor(Math.random() * 30);
      baseScore = Math.min(baseScore, 100);
    }

    setScore(baseScore);
  }, [upi]);

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
    alert('This UPI ID would be reported to database (todo)');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 space-y-4 text-white">
      <h1 className="text-3xl font-bold text-red-500">Scan Result</h1>
      {parsed.id ? (
        <>
          <p><strong>UPI ID:</strong> {parsed.id}</p>
          <p><strong>Name:</strong> {parsed.name}</p>
          <p><strong>Amount:</strong> ₹{parsed.amount}</p>
          <p className={`mt-4 text-xl font-semibold ${getColor(score)}`}>
            🧠 Risk Score: {score} – {getRiskLabel(score)}
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
        </>
      ) : (
        <p>No UPI link found.</p>
      )}
    </main>
  );
}
