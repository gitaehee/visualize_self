# backend/api/routes/__init__.py

def register_routes(app):
    try:
        from .movies_routes import movies_bp
        app.register_blueprint(movies_bp)
        print("✅ movies_routes 등록 완료")
    except ImportError as e:
        print(f"❌ movies_routes import 실패: {e}")

    try:
        from .vote_routes import vote_bp
        app.register_blueprint(vote_bp)
        print("✅ vote_routes 등록 완료")
    except ImportError as e:
        print(f"❌ vote_routes import 실패: {e}")
