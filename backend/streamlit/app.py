# backend/streamlit/app.py
import streamlit as st
import requests

import plotly.express as px
import pandas as pd
import os
from backend.api.config import ProductionConfig, DevelopmentConfig  # 🔥 config.py에서 불러오기


# Flask 백엔드 API 주소 (투표 결과 API)
API_URL = os.getenv("API_URL", "http://ksciptime.iptime.org:5000/api/results") # 여기 나중에 바꿔야함

st.title("🎬 영화 투표 결과")
st.write("실시간 투표 결과를 확인하세요!")

# 영화 제목을 장르로 변환하는 매핑
genre_mapping = {
    "After Sunrise": "로맨스",
    "TITANIC": "뮤지컬",
    "Red Room": "공포",
    "장화 싫은 고양이": "애니메이션",
    "CODENAME:000": "액션",
    "왕빙어모": "역사",
    "UFO: the silent invasion": "SF",
    "The seekers of stars": "판타지",
}

try:
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
    }

    # OPTIONS 요청 (Preflight) - 필요 시
    requests.options(API_URL, headers=headers)
    
    # 실제 데이터 요청
    response = requests.get(API_URL, headers=headers)

    if response.status_code != 200:
        raise ValueError(f"API 요청 실패: {response.status_code}")

    votes = response.json()

    if not votes:
        st.error("데이터가 없습니다. 투표를 진행해주세요!")
    else:
        total_votes = sum(votes.values())
        st.subheader(f"🍿 현재 투표 수 : {total_votes}표")
        st.subheader("📊 영화별 투표 수")

        sorted_votes = sorted(votes.items(), key=lambda x: x[1], reverse=True)
        for title, count in sorted_votes:
            st.write(f"🎥 {title} : {count}표 {'🍿 ' * count}")
        
        st.subheader("🎭 장르별 투표 결과 (그래프)")

        genre_counts = {}
        for title, count in votes.items():
            genre = genre_mapping.get(title, title)
            genre_counts[genre] = genre_counts.get(genre, 0) + count

        sorted_genre_votes = sorted(genre_counts.items(), key=lambda x: x[1], reverse=False)
        genres = [item[0] for item in sorted_genre_votes]
        vote_counts = [item[1] for item in sorted_genre_votes]

        df = pd.DataFrame({"영화 장르": genres, "투표 수": vote_counts})
        fig = px.bar(
            df,
            x="투표 수",
            y="영화 장르",
            orientation="h",
            title="실시간 투표 결과",
            labels={"투표 수": "투표 수", "영화 장르": "영화 장르"}
        )
        fig.update_xaxes(dtick=1)
        st.plotly_chart(fig)

except Exception as e:
    st.error(f"데이터를 불러오는 데 실패했습니다: {e}")
