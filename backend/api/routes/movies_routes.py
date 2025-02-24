from flask import Blueprint, jsonify, Response, json
from api.business import (
    load_movies_data,
    process_top10_movies,
    add_release_year,
    get_genre_counts_per_year,
    load_audience_data
)
import pandas as pd

# Blueprint 생성 (URL prefix를 "/api"로 지정)
movies_bp = Blueprint('movies', __name__, url_prefix='/api')

# CSV 데이터 로드 및 전처리 (모듈 로딩 시 한 번 수행)
df = load_movies_data()
df = add_release_year(df)
data = load_audience_data()
# 모든 연도의 목록 생성 (예: [최소연도, ..., 최대연도])
ALL_YEARS = list(range(int(df["개봉연도"].min()), int(df["개봉연도"].max()) + 1))


@movies_bp.route("/genre-trends", methods=["GET"])
def genre_trends():
    """
    연도별 장르 개봉 횟수를 계산하여, 각 장르별 데이터를 반환합니다.
    """
    result = get_genre_counts_per_year(df)
    return jsonify(result)


@movies_bp.route("/top10movies", methods=["GET"])
def get_top10_movies():
    """
    관객 수 기준으로 상위 10개 영화를 선택하여 반환합니다.
    """
    movies = process_top10_movies(df)
    json_str = json.dumps(movies, ensure_ascii=False)
    return Response(json_str, content_type="application/json; charset=utf-8")


@movies_bp.route("/movies/<int:movie_id>", methods=["GET"])
def get_movie(movie_id):
    """
    특정 영화 ID에 해당하는 영화 정보를 반환합니다.
    """
    movie = df[df['id'] == movie_id]
    if movie.empty:
        return jsonify({'error': '영화를 찾을 수 없습니다.'}), 404
    return jsonify(movie.to_dict(orient='records')[0])


@movies_bp.route("/distributor-counts", methods=["GET"])
def get_distributor_counts():
    """
    배급사별로 관객 수가 10,000,000 이상인 영화의 개수를 집계하여 반환합니다.
    """
    df_10m = df[df['관객수'].str.replace(',', '').astype(int) >= 10000000]
    distributor_counts = df_10m.groupby('배급사').size().reset_index(name='count')
    result = distributor_counts.to_dict(orient='records')
    return jsonify(result)

# audience 라우트 수정
@movies_bp.route('/audience', methods=['GET'])
def audience():
    # '연도' 컬럼을 숫자로 변환
    data['연도'] = data['연도'].astype(int)
    filtered_data = data[(data['연도'] >= 1990) & (data['연도'] <= 2025)]
    
    response = [
        {"year": int(row['연도']), "audience": int(row['전체_관객수'].replace(',', ''))}
        for _, row in filtered_data.iterrows()
    ]
    print(response)
    return jsonify(response)

@movies_bp.route("/audience-ratio", methods=["GET"])
def audience_ratio():
    df = load_movies_data()
    df = add_release_year(df)

    if '대표국적' not in df.columns:
        return jsonify({"error": "대표국적 컬럼이 없습니다."}), 400

    df['관객수'] = df['관객수'].str.replace(',', '').astype(int)

    audience_data = df.groupby(['개봉연도', '대표국적'])['관객수'].sum().unstack(fill_value=0).reset_index()

    response = []
    for _, row in audience_data.iterrows():
        year = int(row['개봉연도'])
        movies_this_year = df[df['개봉연도'] == year][['영화명', '대표국적', '관객수']]

        movie_list = {}
        for country in movies_this_year['대표국적'].unique():
            sorted_movies = movies_this_year[movies_this_year['대표국적'] == country].sort_values(by='관객수', ascending=False)
            movie_list[country] = sorted_movies['영화명'].tolist()

        year_data = {"year": year, "movies": movie_list}
        for country in audience_data.columns[1:]:
            year_data[country] = int(row[country])
        response.append(year_data)

    return jsonify(response)