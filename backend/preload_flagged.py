import json
from firebase import db

ref = db.reference('flagged')
count = 0

with open('upi_dataset_enhanced.JSON', mode='r', encoding='utf-8') as file:
    data = json.load(file)
    print(f"🧾 Total entries in JSON: {len(data)}")

    for upi, info in data.items():
        ref.child(upi).set(info)
        print(f"☑️ {upi}: is_scam = {info['is_scam']}")
        count += 1

print(f"\n✅ Total UPI IDs uploaded: {count}")
