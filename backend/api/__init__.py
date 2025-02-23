# backend/api/__init__.py
from flask import Flask
from flask_cors import CORS
from api.config import DevelopmentConfig, ProductionConfig  # 환경 설정
from api.routes import register_routes  # 라우트 등록 함수
import os

def create_app():
    app = Flask(__name__)

    ENV = os.getenv("FLASK_ENV", "development")  # 기본값: development

    if ENV == "production":
        config = ProductionConfig()
    else:
        config = DevelopmentConfig()

    app.config.from_object(config)

    print(ENV, '______________env는 이거입니다')
    # CORS 설정을 정확하게 추가
    CORS(app, resources={r"/*": {"origins": "*"}})

    # 라우트 등록
    register_routes(app)

    return app
