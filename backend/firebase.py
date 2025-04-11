import firebase_admin
from firebase_admin import credentials, db

cred = credentials.Certificate("firebase-key.json")

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://redtransact-172d3-default-rtdb.firebaseio.com/'
}) 