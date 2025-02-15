from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}})
# CORS 설정 (프론트엔드와 통신 허용)

# 투표 결과 저장 (간단한 in-memory 데이터)
votes = {"option1": 0, "option2": 0, "option3": 0}

@app.route("/vote", methods=["POST"])
def vote():
    data = request.json
    option = data.get("option")

    if option not in votes:
        return jsonify({"error": "Invalid option"}), 400

    votes[option] += 1  # 투표 카운트 증가
    return jsonify({"message": "Vote counted", "votes": votes})

@app.route("/results", methods=["GET"])
def get_results():
    return jsonify(votes)

if __name__ == "__main__":
    app.run(debug=True, port=5000)
