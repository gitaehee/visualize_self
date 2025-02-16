from flask import Flask, request, jsonify, Response, json
from flask_cors import CORS
import pandas as pd
import math

app = Flask(__name__)

# CORS 설정: React 앱 (http://localhost:3000, http://127.0.0.1:3000)에서의 요청을 허용합니다.
CORS(app, resources={r"/*": {"origins": [
    "http://localhost:3000", 
    "http://127.0.0.1:3000",
    "http://localhost:3001", 
    "http://127.0.0.1:3001"
]}})


# ===============================
# 1. 영화 데이터 관련 API
# ===============================

# CSV 파일 로드 및 컬럼명 정리
df = pd.read_csv("top200_movies_with_posters.csv")
df.columns = df.columns.str.strip()

# 각 영화에 고유 ID 추가 (옵션)
df['id'] = df.index

def replace_nan(obj):
        """딕셔너리 내 NaN 값을 None으로 변환"""
        if isinstance(obj, dict):
            return {k: replace_nan(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [replace_nan(v) for v in obj]
        elif isinstance(obj, float) and math.isnan(obj):
            return None
        return obj

def process_movies(df):
    # NaN 처리
    movies = df.to_dict(orient='records')
    movies = replace_nan(movies)
    
    # 🎯 1️⃣ 관객 수를 숫자로 변환
    for movie in movies:
        movie["관객수"] = int(movie["관객수"].replace(',', '')) if isinstance(movie["관객수"], str) else movie["관객수"]

    # 🎯 2️⃣ 숫자로 변환된 값을 기준으로 정렬 (내림차순)
    movies = sorted(movies, key=lambda x: x["관객수"], reverse=True)[:10]

    # 🎯 3️⃣ 반환할 때 숫자를 다시 쉼표 포함된 문자열로 변환
    for movie in movies:
        movie["관객수"] = f"{movie['관객수']:,}"  # 쉼표 추가된 문자열 변환

    return movies


@app.route('/api/top10movies', methods=['GET'])
def get_top10_movies():
    movies = process_movies(df)
    json_str = json.dumps(movies, ensure_ascii=False)
    # Response 객체를 사용하여 Content-Type을 'application/json'으로 설정합니다.
    response = Response(json_str, content_type="application/json; charset=utf-8")
    return response


@app.route('/api/movies/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
    """
    특정 영화 데이터를 ID를 기반으로 JSON 형식으로 반환합니다.
    """
    movie = df[df['id'] == movie_id]
    if movie.empty:
        return jsonify({'error': '영화를 찾을 수 없습니다.'}), 404
    return jsonify(movie.to_dict(orient='records')[0])

# ===============================
# 2. 투표 관련 API
# ===============================

# 간단한 in-memory 투표 결과 저장 (예시)
votes = {"option1": 0, "option2": 0, "option3": 0}

@app.route("/vote", methods=["POST"])
def vote():
    """
    POST 요청으로 전달된 'option' 값을 기반으로 투표수를 증가시킵니다.
    """
    data = request.json
    option = data.get("option")

    if option not in votes:
        return jsonify({"error": "Invalid option"}), 400

    votes[option] += 1  # 투표 카운트 증가
    return jsonify({"message": "Vote counted", "votes": votes})

@app.route("/results", methods=["GET"])
def get_results():
    """
    현재 투표 결과를 반환합니다.
    """
    return jsonify(votes)

# ===============================
# 애플리케이션 실행
# ===============================
if __name__ == "__main__":
    app.run(debug=True, port=5000)
