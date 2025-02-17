import streamlit as st
import requests
import matplotlib.pyplot as plt

# y축 한글 깨짐 해결
plt.rcParams['font.family'] ='AppleGothic'
plt.rcParams['axes.unicode_minus'] =False


# ✅ API에서 투표 데이터 가져오기
API_URL = "http://localhost:5000/results"  # Flask 백엔드 API 주소

st.title("🎬 영화 투표 결과")
st.write("실시간 투표 결과를 확인하세요!")


# 영화 제목을 장르로 변환하는 매핑
genre_mapping = {
    "사랑이야기": "로맨스",
    "라라랜드": "뮤지컬",
    "무서워": "스릴러",
    "애니메": "애니메이션",
    "액션히어로": "액션",
    "역사히스토리": "역사",
    "코미디하하하": "코미디",
    "판타지세계": "판타지",
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
        # ✅ 투표 수가 많은 순으로 정렬
        sorted_votes = sorted(votes.items(), key=lambda x: x[1], reverse=False)
        
        # ✅ 1. 영화 제목별 투표 수 출력 (텍스트)
        st.subheader("📊 영화별 투표 수")

        sorted_votes = sorted(votes.items(), key=lambda x: x[1], reverse=True)

        for title, count in sorted_votes:
            st.write(f"🎥 {title} : {count}표")  # 제목 : 몇 표 형식으로 출력
        
        # ✅ 2. 장르별 투표 수 그래프 출력
        st.subheader("🎭 장르별 투표 결과 (그래프)")

        genres = [genre_mapping.get(item[0], item[0]) for item in sorted_votes]
        vote_counts = [item[1] for item in sorted_votes]

        # ✅ 그래프 그리기
        fig, ax = plt.subplots()
        ax.barh(genres, vote_counts, color="skyblue")
        ax.set_xlabel("투표 수")
        ax.set_ylabel("영화 장르")
        ax.set_title("실시간 투표 결과")

        st.pyplot(fig)

except Exception as e:
    st.error(f"데이터를 불러오는 데 실패했습니다: {e}")

