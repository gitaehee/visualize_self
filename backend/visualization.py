import streamlit as st
import requests
import plotly.express as px
import pandas as pd

# API에서 투표 데이터 가져오기
API_URL = "http://localhost:5000/results"  # Flask 백엔드 API 주소

st.title("🎬 영화 투표 결과")
st.write("실시간 투표 결과를 확인하세요!")

# 영화 제목을 장르로 변환하는 매핑
genre_mapping = {
    "애프터 선셋": "로맨스",
    "우는 남자": "뮤지컬",
    "무서워": "스릴러",
    "장화 안 신은 고양이": "애니메이션",
    "액션히어로": "액션",
    "태정태세문단세": "역사",
    "아마..존": "코미디",
    "ufo 판타지": "판타지",
}

try:
    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",  # ✅ CORS 허용
        "Access-Control-Allow-Methods": "GET, OPTIONS",
    }

    # ✅ OPTIONS 요청을 먼저 보내기 (Preflight 해결)
    requests.options(API_URL, headers=headers)
    
    # ✅ 실제 데이터 요청
    response = requests.get(API_URL, headers=headers)

    # ✅ 응답이 JSON 형식이 아닐 경우 예외 처리
    if response.status_code != 200:
        raise ValueError(f"API 요청 실패: {response.status_code}")

    votes = response.json()

    # ✅ 빈 데이터 처리
    if not votes:
        st.error("데이터가 없습니다. 투표를 진행해주세요!")
    
    else:
        # ✅ 총 투표 수 계산
        total_votes = sum(votes.values())
        # ✅ 페이지 상단에 현재 투표 수 표시
        st.subheader(f"🍿 현재 투표 수 : {total_votes}표")

        # ✅ 1. 영화 제목별 투표 수 출력 (텍스트)
        st.subheader("📊 영화별 투표 수")

        sorted_votes = sorted(votes.items(), key=lambda x: x[1], reverse=True)
        for title, count in sorted_votes:
            st.write(f"🎥 {title} : {count}표 {'🍿 ' * count}")  # 제목 : 몇 표 형식으로 출력
        
        # ✅ 2. 장르별 투표 수 그래프 출력 (Plotly)
        st.subheader("🎭 장르별 투표 결과 (그래프)")

        # 영화 제목을 장르로 변환하여 카운트
        genre_counts = {}
        for title, count in votes.items():
            genre = genre_mapping.get(title, title)  # 영화 제목을 장르로 변환 (기본값은 원래 제목)
            genre_counts[genre] = genre_counts.get(genre, 0) + count

        # 장르별 투표 수 정렬
        sorted_genre_votes = sorted(genre_counts.items(), key=lambda x: x[1], reverse=False)
        genres = [item[0] for item in sorted_genre_votes]
        vote_counts = [item[1] for item in sorted_genre_votes]

        # Plotly를 이용한 수평 막대 그래프 생성
        df = pd.DataFrame({"영화 장르": genres, "투표 수": vote_counts})
        fig = px.bar(
            df,
            x="투표 수",
            y="영화 장르",
            orientation="h",
            title="실시간 투표 결과",
            labels={"투표 수": "투표 수", "영화 장르": "영화 장르"}
        )
        # x축 눈금을 자연수 단위로 설정
        fig.update_xaxes(dtick=1)
        
        st.plotly_chart(fig)

except Exception as e:
    st.error(f"데이터를 불러오는 데 실패했습니다: {e}")
