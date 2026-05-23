# 철새 맵 (Migratory Bird Dashboard)

대한민국 **철새 도래 현황**을 한눈에 볼 수 있는 Next.js 교육용 대시보드 MVP입니다.

공공데이터 API와 OpenWeather API를 연동하고, API 실패 시 mock data로 자동 전환되어 **Vercel에서도 안정적으로 동작**합니다.

- GitHub Repository: [jeonju014-beep/migratory-bird-map](https://github.com/jeonju014-beep/migratory-bird-map)

## 주요 기능

- 지역별 철새 도래지·습지 목록
- 5일 날씨 요약 및 **철새 관측 추천지수** (0~100점)
- Recharts 기반 Bar / Line / Pie 차트
- 추천 지역 TOP3
- 반응형 SaaS 스타일 UI
- API 실패 시 mock data fallback

## 기술 스택

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Recharts
- Vercel 배포

## 로컬 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/jeonju014-beep/migratory-bird-map.git
cd migratory-bird-map
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경변수 설정

`.env.local.example` 파일을 복사해 `.env.local`을 만듭니다.

```bash
# Windows (PowerShell)
copy .env.local.example .env.local

# macOS / Linux
cp .env.local.example .env.local
```

`.env.local` 파일을 열고 아래 값을 입력합니다.

```env
PUBLIC_DATA_SERVICE_KEY=공공데이터포털_서비스키
OPENWEATHER_API_KEY=OpenWeather_API키
```

> **API 키 없이도 실행 가능합니다.** 키가 없거나 API 호출이 실패하면 mock data로 UI를 확인할 수 있습니다.

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다.

### 5. 빌드 확인 (배포 전 필수)

```bash
npm run build
npm run start
```

## 환경변수 설명

| 변수명 | 설명 | 사용처 |
|--------|------|--------|
| `PUBLIC_DATA_SERVICE_KEY` | 공공데이터포털 서비스키 | TourAPI, 물과여행 API |
| `OPENWEATHER_API_KEY` | OpenWeather API 키 | 5일 날씨 예보 |

### ⚠️ API Key 보안 주의사항

- **실제 API Key 값은 GitHub에 절대 커밋하지 마세요.**
- `.env.local` 파일은 `.gitignore`에 포함되어 있습니다.
- API Key는 **서버(Route Handler / Server Component)에서만** 사용됩니다.
- `NEXT_PUBLIC_` 접두사를 붙이지 마세요. (클라이언트에 노출됩니다)

## Vercel 배포 방법

### 1. GitHub에 코드 Push

아래 [Git 명령어](#github-push-명령어) 섹션을 참고해 저장소에 코드를 올립니다.

### 2. Vercel에서 Repository Import

1. [Vercel](https://vercel.com)에 로그인
2. **Add New → Project**
3. GitHub 계정 연결 후 `jeonju014-beep/migratory-bird-map` 선택
4. Framework Preset: **Next.js** (자동 감지)
5. **Environment Variables** 섹션에서 아래 키 등록:

| Key | Value |
|-----|-------|
| `PUBLIC_DATA_SERVICE_KEY` | 공공데이터포털 서비스키 |
| `OPENWEATHER_API_KEY` | OpenWeather API 키 |

6. **Deploy** 클릭

### 3. 배포 후 확인

배포가 완료되면 Vercel이 제공하는 URL(예: `https://migratory-bird-map.vercel.app`)에서 대시보드를 확인합니다.

환경변수를 등록하지 않아도 mock data로 UI는 정상 표시됩니다.

## 프로젝트 구조

```
src/
├── app/
│   ├── api/          # Route Handler (외부 API 호출)
│   ├── page.tsx      # 대시보드 (Server Component)
│   ├── loading.tsx
│   └── error.tsx
├── components/       # UI · 차트 컴포넌트
├── lib/
│   ├── api/          # API 호출 로직 (server-only)
│   ├── mock/         # fallback 데이터
│   └── utils/        # 추천지수 계산 등
└── types/            # TypeScript 타입
```

## API Route

| 경로 | 설명 |
|------|------|
| `/api/dashboard` | 대시보드 통합 데이터 |
| `/api/bird-sites` | 철새 도래지 목록 |
| `/api/wetland-spots` | 습지·수변 명소 |
| `/api/weather` | 5일 날씨 예보 |

## 문서

자세한 요구사항은 [PRD.md](./PRD.md)를 참고하세요.

---

## Vercel 배포 전 체크리스트

배포 전 아래 항목을 순서대로 확인하세요.

- [ ] `npm install` 성공
- [ ] `npm run build` 에러 없이 완료
- [ ] `.env.local` 이 Git에 포함되지 않았는지 확인 (`git status`에 `.env.local` 없어야 함)
- [ ] GitHub push 완료
- [ ] Vercel에서 repository import
- [ ] Vercel Environment Variables 등록
  - [ ] `PUBLIC_DATA_SERVICE_KEY`
  - [ ] `OPENWEATHER_API_KEY`
- [ ] Deploy 클릭
- [ ] 배포 후 대시보드 UI, 차트, API fallback 동작 확인

---

## GitHub Push 명령어

프로젝트 폴더에서 아래 명령어를 순서대로 실행하세요.

```bash
git init
git add .
git commit -m "feat: 철새 도래 대시보드 MVP 및 Vercel 배포 준비"
git branch -M main
git remote add origin https://github.com/jeonju014-beep/migratory-bird-map.git
git push -u origin main
```

이미 Git이 초기화되어 있다면:

```bash
git add .
git commit -m "chore: Vercel 배포 호환성 점검 및 README 정리"
git push origin main
```

> GitHub에 **실제 API Key가 포함된 `.env.local` 파일을 push하지 않도록** 반드시 push 전 `git status`로 확인하세요.
