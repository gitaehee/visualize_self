from flask import Flask, request, jsonify, json  # ✅ json 모듈 추가
from flask_cors import CORS

app = Flask(__name__)
# ✅ 모든 요청을 허용하도록 CORS 설정 강화
CORS(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://localhost:8501"], "allow_headers": "*", "methods": ["GET", "POST", "OPTIONS"]}})


# 투표 결과 저장
votes = {
    "무서워": 0,
    "사랑이야기": 0,
    "역사히스토리": 0,
    "판타지세계": 0,
    "액션히어로": 0,
    "코미디하하하": 0,
    "라라랜드": 0,
    "애니메": 0
}


@app.route("/vote", methods=["POST"])
def vote():
    data = request.json
    option = data.get("option")

    print("📌 받은 option 값:", option)  # ✅ 백엔드에서 option 값 확인

    if option not in votes:
        print("❌ 유효하지 않은 option:", option)  # ✅ 백엔드에서 오류 출력
        return jsonify({"error": "Invalid option"}), 400

    votes[option] += 1  # 투표 카운트 증가
    return jsonify({"message": "Vote counted", "votes": votes})

@app.route("/results", methods=["GET", "OPTIONS"])  # ✅ OPTIONS 요청도 허용
def get_results():
    print("✅ /results API 요청 받음")  # 🔹 요청이 들어왔는지 확인
    
    
    if not votes:
        return jsonify({"error": "No data available"}), 500  # ❌ 빈 데이터 방지

    return app.response_class(
        response=json.dumps(votes, ensure_ascii=False, indent=2),  # ✅ 사람이 읽기 쉽게 변환
        mimetype="application/json"
    )



print("📌 등록된 라우트 목록:")
for rule in app.url_map.iter_rules():
    print(rule) 

if __name__ == "__main__":
    app.run(debug=True, port=5000, host="localhost")  # "0.0.0.0" 대신 "localhost" 사용
