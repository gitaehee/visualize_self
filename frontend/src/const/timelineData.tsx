const getImagePaths = (year: number | string, count: number) => {
  return Array.from(
    { length: count },
    (_, i) => `/homeimages/${year}_${i + 1}.png`
  );
};

export const timelineData = [
  {
    year: 1919,
    title: "의리적 구토",
    description: (
      <>
        김도산이 각본을 쓰고 주연한 키노드라마로, 서울 단성사에서 초연된{" "}
        <strong>한국 최초의 영화</strong>입니다. 이는 한국 영화의 시작을 알리는
        역사적인 순간이었습니다.
      </>
    ),
    imageCount: 1,
  },
  {
    year: 1955,
    title: "자유부인",
    description: (
      <>
        이병일 감독의 자유부인은 <strong>해방 이후 한국 영화의 부흥기</strong>를
        알린 작품입니다.
      </>
    ),
    imageCount: 2,
  },
  {
    year: 1993,
    title: "서편제",
    description: (
      <>
        한국 영화 사상 처음으로 <strong>백만 관객을 돌파</strong>하여 ‘백만 관객
        시대’를 연 첫 번째 영화입니다.
      </>
    ),
    imageCount: 3,
  },
  {
    year: 1999,
    title: "쉬리",
    description: (
      <>
        강제규 감독의 쉬리는 <strong>한국 영화 최초로 블록버스터</strong> 개념을
        도입하여 상업 영화의 새로운 지평을 열었습니다.
      </>
    ),
    imageCount: 2,
  },
  {
    year: 2003,
    title: "실미도",
    description: (
      <>
        강우석 감독의 실미도가 <strong>한국 영화 사상 최초로 천만 관객</strong>
        을 돌파하며 한국 영화의 새로운 기록을 세웠습니다.
      </>
    ),
    imageCount: 2,
  },
  {
    year: 2010,
    title: "한국 영화 성장기",
    description: (
      <>
        <strong>명량, 국제시장, 부산행, 신과함께, 극한직업</strong> 등 다양한
        장르에서 천만 관객을 달성하며 <strong>영화 산업의 부흥기</strong>를
        맞았습니다.
      </>
    ),
    imageCount: 4,
  },
  {
    year: 2019,
    title: "기생충",
    description: (
      <>
        봉준호 감독의 기생충이 한국 영화 최초로 <strong>칸 영화제</strong>에서
        최고상인 <strong>황금종려상을 수상</strong>하며 세계적인 인정을
        받았습니다.
      </>
    ),
    imageCount: 2,
  },
  {
    year: 2020,
    title: "글로벌 영향력 확대",
    description: (
      <>
        <strong>미나리</strong>의 윤여정은{" "}
        <strong>한국 배우 최초로 아카데미 여우조연상</strong>을 수상하였고,{" "}
        <strong>골든글로브 외국어영화상</strong>을 수상했습니다. 헤어질 결심의
        박찬욱 감독은 한국 감독으로서는 두 번째로{" "}
        <strong>칸 영화제 감독상</strong>을 수상하였고,
        <strong>브로커</strong>의 송강호는{" "}
        <strong>한국 배우 최초로 칸 남우주연상</strong>을 수상하며 해외
        시장에서의 영향력을 증명했습니다.
      </>
    ),
    imageCount: 4,
  },
].map((data) => ({
  ...data,
  images: getImagePaths(data.year, data.imageCount),
}));
