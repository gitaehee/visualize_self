# backend/api/config.py
import os

class Config:
    API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:5000")
    JSON_AS_ASCII = False
    SECRET_KEY = os.getenv("SECRET_KEY", "your-secret-key")
    DEBUG = False

class DevelopmentConfig(Config):
    API_BASE_URL = "http://ksciptime.iptime.org:5000"
    DEBUG = True

class ProductionConfig(Config):
    API_BASE_URL = os.getenv("API_BASE_URL", "https://datavisualization-teal-one.vercel.app")
