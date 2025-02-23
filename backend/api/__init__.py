# backend/api/__init__.py
from flask import Flask
from flask_cors import CORS
from api.config import DevelopmentConfig  # 환경 설정
from api.routes import register_routes  # 라우트 등록 함수

def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    # CORS 설정을 정확하게 추가
    CORS(app, resources={r"/*": {"origins": "*"}})

    # 라우트 등록
    register_routes(app)

    return app
