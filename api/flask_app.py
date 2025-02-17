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

# 각 영화에 고유 ID 추가
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
    """ TOP 10 영화 데이터 변환 """
    movies = df.to_dict(orient='records')
    movies = replace_nan(movies)

    # 🎯 관객 수를 숫자로 변환 후 정렬
    for movie in movies:
        movie["관객수"] = int(movie["관객수"].replace(',', '')) if isinstance(movie["관객수"], str) else movie["관객수"]

    movies = sorted(movies, key=lambda x: x["관객수"], reverse=True)[:10]

    # 🎯 반환 시 쉼표 추가된 문자열로 변환
    for movie in movies:
        movie["관객수"] = f"{movie['관객수']:,}"

    return movies



# ✅ 개봉 연도를 새로운 컬럼으로 추가
df["개봉연도"] = pd.to_datetime(df["개봉일"], errors="coerce").dt.year

# ✅ 모든 연도 목록 생성 (연도가 끊기지 않도록)
ALL_YEARS = list(range(df["개봉연도"].min(), df["개봉연도"].max() + 1))

# ✅ 연도별 장르 개봉 횟수 집계 (연도 공백 없이 처리)
def get_genre_counts_per_year():
    all_genres = []

    for _, row in df.iterrows():
        year = row["개봉연도"]
        genres = str(row["장르"]).split(", ")  # 🎯 '장르' 컬럼을 리스트로 변환
        for genre in genres:
            all_genres.append({"year": year, "genre": genre})

    genre_df = pd.DataFrame(all_genres)

    # ✅ 연도별 장르 개봉 횟수를 하나의 값으로 집계
    genre_counts = (
        genre_df.groupby(["year", "genre"]).size()
        .reset_index(name="count")
        .sort_values(["year", "count"], ascending=[True, False])
    )

    # ✅ 장르별로 하나의 연속된 데이터로 변환 (연속 연도 보장)
    transformed_data = {}
    for genre in genre_df["genre"].unique():
        transformed_data[genre] = {"id": genre, "data": []}
        genre_data = genre_counts[genre_counts["genre"] == genre].set_index("year")["count"].to_dict()

        for year in ALL_YEARS:
            transformed_data[genre]["data"].append({"x": str(year), "y": genre_data.get(year, 0)})  # ❗ 빈 연도는 0으로 채우기

    return list(transformed_data.values())



# ✅ API 엔드포인트 추가
@app.route("/api/genre-trends", methods=["GET"])
def genre_trends():
    result = get_genre_counts_per_year()
    return jsonify(result)

@app.route('/api/top10movies', methods=['GET'])
def get_top10_movies():
    movies = process_movies(df)
    json_str = json.dumps(movies, ensure_ascii=False)
    return Response(json_str, content_type="application/json; charset=utf-8")

@app.route('/api/movies/<int:movie_id>', methods=['GET'])
def get_movie(movie_id):
    """ 특정 영화 데이터를 ID 기반으로 반환 """
    movie = df[df['id'] == movie_id]
    if movie.empty:
        return jsonify({'error': '영화를 찾을 수 없습니다.'}), 404
    return jsonify(movie.to_dict(orient='records')[0])

# ===============================
# 🎬 2. 배급사별 천만 이상 영화 개수 반환 API
# ===============================

@app.route('/api/distributor-counts', methods=['GET'])
def get_distributor_counts():
    """ 배급사별 천만 관객 영화 개수를 반환 """
    df_10m = df[df['관객수'].str.replace(',', '').astype(int) >= 10000000]  # 🎯 1,000만 이상 필터링
    distributor_counts = df_10m.groupby('배급사').size().reset_index(name='count')

    result = distributor_counts.to_dict(orient='records')
    return jsonify(result)

# ===============================
# 3. 투표 관련 API
# ===============================

votes = {"option1": 0, "option2": 0, "option3": 0}

@app.route("/vote", methods=["POST"])
def vote():
    """ 특정 옵션에 투표 """
    data = request.json
    option = data.get("option")

    if option not in votes:
        return jsonify({"error": "Invalid option"}), 400

    votes[option] += 1
    return jsonify({"message": "Vote counted", "votes": votes})

@app.route("/results", methods=["GET"])
def get_results():
    """ 현재 투표 결과 반환 """
    return jsonify(votes)


# ===============================
# 애플리케이션 실행
# ===============================
if __name__ == "__main__":
    app.run(debug=True, port=5000)
