from fastapi import FastAPI
from pydantic import BaseModel
from firebase import db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend → backend calls (for dev/testing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class UPIRequest(BaseModel):
    upi_id: str

@app.post("/check_upi/")
def check_upi(data: UPIRequest):
    upi_id = data.upi_id.strip().lower()

    ref = db.reference("flagged")
    record = ref.child(upi_id).get()

    if record:
        is_scam = record.get("is_scam", False)
        return {
            "upi_id": record.get("upi_id", upi_id),
            "is_scam": is_scam,
            "risk_score": 100 if is_scam else 10,
            "message": "UPI flagged as scam." if is_scam else "UPI appears safe.",
        }
    else:
        return {
            "upi_id": upi_id,
            "is_scam": False,
            "risk_score": 30,
            "message": "UPI not found in database. Proceed with caution.",
        }

@app.post("/report_upi/")
def report_upi(data: UPIRequest):
    upi_id = data.upi_id.strip().lower()

    ref = db.reference("flagged")
    ref.child(upi_id).set({
        "upi_id": upi_id,
        "is_scam": True
    })

    return {"status": f"{upi_id} has been reported and flagged as a scam."}
