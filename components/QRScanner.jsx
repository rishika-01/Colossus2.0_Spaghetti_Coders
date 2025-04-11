'use client'
import { QrReader } from 'react-qr-reader'
import { useState } from 'react'

export default function QRScanner({ onScan }) {
  const [scanResult, setScanResult] = useState(null)

  return (
    <div className="p-4 border rounded">
      <QrReader
        constraints={{ facingMode: 'environment' }}
        onResult={(result, error) => {
          if (!!result) {
            setScanResult(result?.text)
            onScan(result?.text)
          }
        }}
        style={{ width: '100%' }}
      />
      <p className="mt-2 text-sm text-gray-600">
        {scanResult ? `Scanned: ${scanResult}` : 'Scan a UPI QR Code'}
      </p>
    </div>
  )
}
