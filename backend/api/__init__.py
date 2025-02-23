from flask import Flask
from flask_cors import CORS
from api.routes import register_routes

def create_app():
    app = Flask(__name__)
    
    # CORS 설정을 정확하게 추가
    CORS(app, resources={r"/*": {"origins": "*"}})
    
    register_routes(app)
    
    return app
