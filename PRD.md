# PRD: 대한민국 실시간 철새 도래 현황 대시보드

## 1. 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | 철새 맵 (Migratory Bird Arrival Dashboard) |
| **주제** | 대한민국 실시간 철새 도래 현황 대시보드 |
| **목적** | 비전공자 교육용 프로젝트 — Cursor Agent를 활용해 실제 서비스처럼 보이는 데이터 대시보드 MVP 구현 |
| **우선순위** | 복잡한 아키텍처보다 **빠르게 동작하는 MVP** |

---

## 2. 배경 및 문제 정의

한반도는 동아시아-대양주 철새 이동 경로(Flyway)의 핵심 경유지입니다. 겨울·봄 철새 도래 시기에 습지·하구·갯벌 등 주요 서식지의 현황을 한눈에 파악하기 어렵습니다.

본 대시보드는 **지역별 철새 도래지 정보, 생태관광/습지 데이터, 날씨 적합도**를 통합해 **철새 관측 추천지수**를 제공합니다.

---

## 3. 목표 및 성공 지표

### 목표
- 공공 API + 날씨 API를 연동한 실시간(준실시간) 대시보드 MVP
- API 실패 시에도 mock data로 동작하는 안정적인 UI
- Server Component 중심의 Next.js App Router 구조 학습

### 성공 지표 (MVP)
- [ ] 지역 필터 변경 시 3초 이내 데이터 갱신
- [ ] API 키 미설정/실패 시 mock fallback 정상 동작
- [ ] 모바일·데스크톱 반응형 레이아웃
- [ ] 추천지수 TOP3 및 Recharts 3종 차트 표시

---

## 4. 사용자 및 사용 시나리오

### 타겟 사용자
- 생태·조류 관심 일반 시민
- 비전공자 교육 수강생 (Cursor Agent 실습)

### 핵심 시나리오
1. 사용자가 **지역(시·도)** 을 선택한다.
2. 해당 지역의 **철새 도래지·습지·생태관광지** 목록을 확인한다.
3. **5일 날씨 요약**과 **철새 관측 추천지수(0~100)** 를 확인한다.
4. **BarChart / LineChart / PieChart** 로 지역·종·날씨 통계를 탐색한다.
5. **추천 지역 TOP3** 카드로 이번 주 관측 적합 지역을 확인한다.

---

## 5. 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| UI | shadcn/ui |
| Charts | Recharts |
| Data Fetching | Next.js API Route (서버 전용) |
| Architecture | Server Component 우선 |

---

## 6. 외부 API 명세

> 모든 외부 API 호출은 **Next.js API Route**에서만 수행. API Key는 `.env.local`에서 관리.

### 6.1 한국관광공사 TourAPI (KorService2)

| 항목 | 값 |
|------|-----|
| Base URL | `https://apis.data.go.kr/B551011/KorService2` |
| 용도 | 철새·습지·생태 관련 관광지 조회 |

**사용 엔드포인트**

| 엔드포인트 | 설명 |
|-----------|------|
| `/searchKeyword2` | 키워드 `"철새"` 검색 — 철새 도래지·관측지 |
| `/areaBasedList2` | 지역 기반 관광지 (`contentTypeId=12` 관광지) |

**필수 파라미터**

```
serviceKey, MobileOS=ETC, MobileApp=MigratoryBirdDashboard,
_type=json, numOfRows, pageNo, areaCode (areaBasedList2)
keyword=철새 (searchKeyword2)
```

### 6.2 한국수자원공사 물과 여행 API

| 항목 | 값 |
|------|-----|
| Base URL | `https://apis.data.go.kr/B500001/myportal/travel` |
| 용도 | 하구·저수지·수변 습지형 관광명소 (철새 서식지 후보) |

**사용 엔드포인트**

| 엔드포인트 | 설명 |
|-----------|------|
| `/getTravelSpotList` | 하천·수변 주요 명소 목록 |

**필수 파라미터**

```
serviceKey, pageNo, numOfRows, searchTypeCd=02,
regionCd, _type=json
```

**regionCd 매핑**

| 코드 | 하천/권역 |
|------|----------|
| HA | 한강 (경기·서울) |
| ND | 낙동강 (경남·부산) |
| YS | 영산강 (전남) |
| SJ | 섬진강 (전북·전남) |
| GU | 금강 (충남·전북) |

### 6.3 OpenWeather API

| 항목 | 값 |
|------|-----|
| Endpoint | `https://api.openweathermap.org/data/2.5/forecast` |
| 용도 | 주요 철새 도래지 도시 5일 날씨 예보 |

**필수 파라미터**

```
lat, lon, appid, units=metric, lang=kr
```

**조회 도시 (예시)**

| 도시 | lat | lon | 대표 서식지 |
|------|-----|-----|------------|
| 순천 | 34.9507 | 127.4872 | 순천만 |
| 서천 | 36.0803 | 126.6919 | 천수만 |
| 강릉 | 37.7519 | 128.8761 | 경포호 |
| 인천 | 37.4563 | 126.7052 | 강화·송도 |
| 부산 | 35.1796 | 129.0756 | 낙동강 하구 |

### 6.4 환경변수

```env
PUBLIC_DATA_SERVICE_KEY=
OPENWEATHER_API_KEY=
```

---

## 7. 지역 필터

TourAPI `areaCode` 기준:

| 코드 | 지역 |
|------|------|
| 0 | 전국 |
| 31 | 경기 |
| 32 | 강원 |
| 34 | 충남 |
| 37 | 전북 |
| 38 | 전남 |
| 36 | 경남 |
| 6 | 부산·울산 |

---

## 8. 필수 기능

| # | 기능 | 설명 |
|---|------|------|
| F1 | 지역 선택 필터 | 시·도 단위 필터, URL searchParams 연동 |
| F2 | 철새 도래지 목록 | searchKeyword2 + areaBasedList2 결과 카드 |
| F3 | 습지·수변 명소 목록 | 물과 여행 API 결과 카드 |
| F4 | 5일 날씨 요약 카드 | OpenWeather forecast 요약 |
| F5 | 철새 관측 추천지수 | 0~100점, 지역별 계산 |
| F6 | Recharts 통계 | BarChart, LineChart, PieChart |
| F7 | 추천 지역 TOP3 | 추천지수 상위 3개 지역 |
| F8 | Mock fallback | API 실패 시 mock data 자동 전환 |
| F9 | 반응형 UI | 모바일 1열 → 데스크톱 그리드 |
| F10 | Loading / Error / Empty | 각 섹션별 상태 UI |

---

## 9. 철새 관측 추천지수 (0~100)

| 항목 | 배점 | 계산 기준 |
|------|------|----------|
| 도래지·습지 수 | 30점 | `(해당 지역 도래지+습지 수 / 전국 최대) × 30` |
| 관측 가능 종수 | 25점 | `(추정 종수 / 150) × 25` (mock/API 보강) |
| 날씨 적합도 | 30점 | 아래 세부 기준 |
| 데이터 완성도 | 15점 | API 응답 필드 충족률 |

### 날씨 적합도 (30점)

| 조건 | 점수 |
|------|------|
| 강수 없음 (5일 중 70% 이상) | +10 |
| 평균 기온 5~15°C (겨울철새) 또는 10~22°C (봄철) | +10 |
| 풍속 10m/s 미만 | +5 |
| 강풍(>15m/s)·폭염(>30°C)·한파(<-5°C) | 각 -5 (최대 -15) |

---

## 10. Recharts 시각화

| 차트 | 타입 | 데이터 |
|------|------|--------|
| 지역별 추천지수 | BarChart | x: 지역명, y: 추천지수 |
| 5일 기온·강수 | LineChart | x: 날짜, y: 기온/강수량 |
| 철새 종 분포 | PieChart | 종 카테고리별 비율 (물새·떼새·맹금류 등) |

---

## 11. 화면 구조 (와이어프레임)

```
┌─────────────────────────────────────────────────┐
│  Header: 철새 맵 · 실시간 도래 현황              │
│  [지역 필터 Select]  [갱신 시각]                 │
├─────────────────────────────────────────────────┤
│  KPI Cards (4)                                   │
│  도래지 수 | 습지 명소 | 추천지수 | 관측 종수     │
├─────────────────────────────────────────────────┤
│  TOP3 추천 지역 (3 cards)                        │
├─────────────────────────────────────────────────┤
│  Charts (2×2 grid)                               │
│  BarChart | LineChart | PieChart | Weather Cards │
├─────────────────────────────────────────────────┤
│  Lists (2 columns)                               │
│  철새 도래지 목록 | 습지·수변 명소 목록           │
└─────────────────────────────────────────────────┘
```

---

## 12. 프로젝트 구조

```
철새 맵/
├── PRD.md
├── .env.local.example
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── api/
│   │       ├── dashboard/route.ts
│   │       ├── bird-sites/route.ts
│   │       ├── wetland-spots/route.ts
│   │       └── weather/route.ts
│   ├── components/
│   │   ├── dashboard/
│   │   ├── charts/
│   │   └── ui/          (shadcn)
│   ├── lib/
│   │   ├── api/         (외부 API 호출)
│   │   ├── utils/       (추천지수, 포맷)
│   │   └── mock/        (fallback 데이터)
│   └── types/
│       ├── bird.ts
│       ├── weather.ts
│       └── dashboard.ts
```

---

## 13. 비기능 요구사항

| 항목 | 요구 |
|------|------|
| 보안 | API Key 클라이언트 노출 금지 |
| 안정성 | API 실패 시 섹션별 fallback, 전체 앱 크래시 방지 |
| 성능 | Server Component 우선, 클라이언트 JS 최소화 |
| 접근성 | 시맨틱 HTML, 색상 대비 WCAG 준수 |
| 교육성 | 파일·함수 역할 분리, 주석은 비즈니스 로직만 |

---

## 14. MVP 범위 (Out of Scope)

- 실시간 GPS·가락지 추적 연동
- 사용자 로그인·즐겨찾기
- 지도(Mapbox/Leaflet) 풀스크린
- 백엔드 DB·캐싱 레이어
- 푸시 알림·이메일 리포트

---

## 15. 일정 (권장)

| 단계 | 작업 | 예상 |
|------|------|------|
| 1 | PRD 확정 | 0.5h |
| 2 | 프로젝트 셋업 + 타입/API | 1h |
| 3 | 대시보드 UI + 차트 | 2h |
| 4 | Fallback + 반응형 + QA | 1h |

---

## 16. 리스크 및 대응

| 리스크 | 대응 |
|--------|------|
| 공공 API 키 미발급 | mock data로 전체 UI 데모 가능 |
| TourAPI "철새" 검색 결과 부족 | areaBasedList2 + 키워드 필터 보강 |
| OpenWeather 무료 한도 | mock weather + 캐시(revalidate) |
| 실시간 도래 개체수 API 부재 | 계절별 mock 관측 데이터 + UI 라벨 "추정" 표시 |

---

*문서 버전: 1.0 · 작성일: 2026-05-23*
