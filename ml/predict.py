import sys
import joblib
import pandas as pd

def predict_fraud(upi_id, reported_count, geo_location, device_type, ip_risk_score):
    model = joblib.load("fraud_detector_optimized.pkl")

    input_df = pd.DataFrame([{
        "upi_id": upi_id,
        "reported_count": int(reported_count),
        "geo_location": geo_location,
        "device_type": device_type,
        "ip_risk_score": float(ip_risk_score)
    }])

    prediction = model.predict(input_df)[0]
    score = model.predict_proba(input_df)[0][1] * 100

    verdict = "SCAM" if prediction == 1 else "SAFE"
    print("\n🚨 Scam Prediction:", verdict)
    print("🧠 Risk Score: {:.0f} / 100".format(score))

if __name__ == "__main__":
    if len(sys.argv) != 6:
        print("Usage: python predict_fraud.py <upi_id> <reported_count> <geo_location> <device_type> <ip_risk_score>")
        sys.exit(1)

    _, upi_id, reported_count, geo_location, device_type, ip_risk_score = sys.argv
    predict_fraud(upi_id, reported_count, geo_location, device_type, ip_risk_score)
