# backend/api/routes/vote_routes.py
from flask import Blueprint, request, jsonify, Response
from flask_cors import cross_origin
import json

vote_bp = Blueprint('vote', __name__, url_prefix='/api')

votes = {
    "Red Room": 0,
    "After Sunrise": 0,
    "왕빙어모": 0,
    "The seekers of stars": 0,
    "CODENAME:000": 0,
    "UFO: the silent invasion": 0,
    "TITANIC": 0,
    "장화 싫은 고양이": 0
}

@vote_bp.route("/vote", methods=["POST", "OPTIONS"])
@cross_origin(supports_credentials=True)  # ✅ CORS 정책 추가
def vote():
    if request.method == "OPTIONS":
        return jsonify({"message": "Preflight OK"}), 200  # ✅ OPTIONS 요청 허용

    data = request.json
    option = data.get("option")
    if option not in votes:
        return jsonify({"error": "Invalid option"}), 400
    votes[option] += 1
    return jsonify({"message": "Vote counted", "votes": votes})

@vote_bp.route("/results", methods=["GET"])
def get_results():
    """한글이 깨지지 않도록 JSON 반환"""
    response_data = json.dumps(votes, ensure_ascii=False, indent=2)  # ✅ 한글 유지
    return Response(response_data, content_type="application/json; charset=utf-8")
