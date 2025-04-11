const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 8000

app.use(cors())
app.use(express.json())

app.post('/check', (req, res) => {
  const { upi_id } = req.body
  let score = 0

  if (upi_id?.toLowerCase().includes('test') || upi_id?.includes('1')) {
    score = Math.floor(Math.random() * 30) + 70 // simulate risky
  } else {
    score = Math.floor(Math.random() * 50) + 10 // simulate safe
  }

  res.json({ risk_score: score })
})

app.listen(PORT, () => {
  console.log(`✅ Mock API running at http://localhost:${PORT}`)
})
