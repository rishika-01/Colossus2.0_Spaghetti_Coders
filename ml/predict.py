import sys
import re
import joblib
import numpy as np

# Load saved model, scaler, and encoder
model = joblib.load('fraud_detector_optimized.pkl')
scaler = joblib.load('scaler.pkl')
encoder = joblib.load('domain_encoder.pkl')

# Get CLI args
upi = sys.argv[1]
amt = float(sys.argv[2])
freq = int(sys.argv[3])

# Extract features
domain = upi.split('@')[1] if '@' in upi else ''
name_length = len(upi.split('@')[0])
has_numbers = int(bool(re.search(r'\d', upi)))
has_suspicious_keywords = int(any(keyword in upi.lower() for keyword in ['fraud', 'scam', 'free', 'cash']))
is_uppercase = int(upi.split('@')[0].isupper())
contains_special_chars = int(bool(re.search(r'[^a-zA-Z0-9@.]', upi)))

# Encode + scale
domain_encoded = encoder.transform([domain])[0]
features = np.array([[domain_encoded, name_length, has_numbers, has_suspicious_keywords, is_uppercase, contains_special_chars]])
features_scaled = scaler.transform(features)

# Predict
prediction = model.predict(features_scaled)[0]
probability = int(model.predict_proba(features_scaled)[0][1] * 100)

# Output
print("🔍 Scam Prediction:", "SCAM" if prediction == 1 else "SAFE")
print("📊 Risk Score:", probability, "/ 100")
