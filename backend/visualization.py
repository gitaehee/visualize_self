import streamlit as st
import requests
import matplotlib.pyplot as plt

# y축 한글 깨짐 해결
plt.rcParams['font.family'] ='AppleGothic'
plt.rcParams['axes.unicode_minus'] =False


# ✅ API에서 투표 데이터 가져오기
API_URL = "http://localhost:5000/results"  # Flask 백엔드 API 주소

st.title("🎬 영화 장르 투표 결과")

st.write("실시간 투표 결과를 확인하세요!")

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
        genres = [item[0] for item in sorted_votes]
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
