import os
import pandas as pd
import math

# ✅ 현재 파일 위치를 기준으로 CSV 경로 설정
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "../data/top200_movies_with_posters.csv")
AUDIENCE_PATH = os.path.join(BASE_DIR, "../data/연도별관객수및매출액.csv")

def load_movies_data():
    """CSV 파일을 읽어 데이터프레임으로 반환"""
    if not os.path.exists(CSV_PATH):
        raise FileNotFoundError(f"CSV 파일을 찾을 수 없습니다: {CSV_PATH}")
    
    df = pd.read_csv(CSV_PATH)
    df.columns = df.columns.str.strip()
    df["id"] = df.index  # 고유 ID 추가
    return df

def load_audience_data():
    if not os.path.exists(AUDIENCE_PATH):
        raise FileNotFoundError(f"CSV 파일을 찾을 수 없습니다: {AUDIENCE_PATH}")
    df = pd.read_csv(AUDIENCE_PATH)
    df.columns = df.columns.str.strip()
    df["id"] = df.index  # 고유 ID 추가
    return df

def replace_nan(obj):
    """딕셔너리 내 NaN 값을 None으로 변환"""
    if isinstance(obj, dict):
        return {k: replace_nan(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [replace_nan(v) for v in obj]
    elif isinstance(obj, float) and math.isnan(obj):
        return None
    return obj

def process_top10_movies(df):
    """관객 수 기준 상위 10개 영화 데이터 반환"""
    movies = df.to_dict(orient='records')
    movies = replace_nan(movies)

    for movie in movies:
        movie["관객수"] = int(movie["관객수"].replace(',', '')) if isinstance(movie["관객수"], str) else movie["관객수"]

    movies = sorted(movies, key=lambda x: x["관객수"], reverse=True)[:10]

    for movie in movies:
        movie["관객수"] = f"{movie['관객수']:,}"  # 숫자를 쉼표 포함된 형식으로 변환

    return movies

def add_release_year(df):
    """개봉 연도를 새로운 컬럼으로 추가"""
    df["개봉연도"] = pd.to_datetime(df["개봉일"], errors="coerce").dt.year
    return df

def get_genre_counts_per_year(df):
    """연도별 장르 개봉 횟수 집계"""
    all_genres = []
    for _, row in df.iterrows():
        year = row["개봉연도"]
        genres = str(row["장르"]).split(", ")  
        for genre in genres:
            all_genres.append({"year": year, "genre": genre})

    genre_df = pd.DataFrame(all_genres)

    genre_counts = (
        genre_df.groupby(["year", "genre"]).size()
        .reset_index(name="count")
        .sort_values(["year", "count"], ascending=[True, False])
    )

    transformed_data = {}
    years_range = list(range(df["개봉연도"].min(), df["개봉연도"].max() + 1))

    for genre in genre_df["genre"].unique():
        transformed_data[genre] = {"id": genre, "data": []}
        genre_data = genre_counts[genre_counts["genre"] == genre].set_index("year")["count"].to_dict()

        for year in years_range:
            transformed_data[genre]["data"].append({"x": str(year), "y": genre_data.get(year, 0)})

    return list(transformed_data.values())
