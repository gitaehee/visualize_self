from flask import Flask
from flask_cors import CORS
from api.config import DevelopmentConfig  # 환경 설정
from api.routes.vote_routes import vote_bp  # ✅ vote 엔드포인트

def create_app():
    app = Flask(__name__)
    app.config.from_object(DevelopmentConfig)

    # CORS 설정 추가
    CORS(app, resources={r"/api/*": {"origins": ["https://datavisualization-teal-one.vercel.app", "http://localhost:3000"]}},
         supports_credentials=True)

    # ✅ vote 엔드포인트 등록
    app.register_blueprint(vote_bp)

    return app
