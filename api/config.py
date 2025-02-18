import os

class Config:
    API_BASE_URL = os.getenv("API_BASE_URL", "http://localhost:5000/api")

class ProductionConfig(Config):
    API_BASE_URL = os.getenv("API_BASE_URL", "https://datavisualization-teal-one.vercel.app/api")

class DevelopmentConfig(Config):
    API_BASE_URL = "http://localhost:5000/api"
