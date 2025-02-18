# backend/api/routes/vote_routes.py
from flask import Blueprint, request, jsonify

vote_bp = Blueprint('vote', __name__, url_prefix='/api')

votes = {
    "무서워": 0,
    "애프터 선셋": 0,
    "태정태세문단세": 0,
    "ufo 판타지": 0,
    "액션히어로": 0,
    "아마..존": 0,
    "우는 남자": 0,
    "장화 안 신은 고양이": 0
}

@vote_bp.route("/vote", methods=["POST"])
def vote():
    data = request.json
    option = data.get("option")
    if option not in votes:
        return jsonify({"error": "Invalid option"}), 400
    votes[option] += 1
    return jsonify({"message": "Vote counted", "votes": votes})

@vote_bp.route("/results", methods=["GET"])
def get_results():
    return jsonify(votes)
