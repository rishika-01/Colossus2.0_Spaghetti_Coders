# RedTransact 🔍💸

RedTransact is a UPI scam detection tool built during **Hack Colossus 2025**. It helps users check the safety of UPI IDs or QR links by scanning, analyzing risk patterns, and flagging suspicious IDs in a live database.

## 🔧 Features
- 📷 Scan UPI QR codes or paste UPI links
- 🤖 Calculates a risk score based on scammy patterns
- ⚠️ Highlights risky UPI IDs
- 🔥 Real-time Firebase integration for flagging/reporting
- 💡 Lightweight, responsive frontend with Next.js

## 🛠️ Tech Stack
- **Frontend**: Next.js + Tailwind CSS + Framer Motion
- **Backend**: Python (FastAPI)
- **Database**: Firebase Realtime DB
- **ML**: Logistic Regression (scam detection logic)

## 🚀 How to Run
```bash
# frontend
cd redtransact-app
npm install
npm run dev

# backend
cd backend
pip install -r requirements.txt
uvicorn app:app --reload
