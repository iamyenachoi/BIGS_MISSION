# BIGS_MISSION - React 게시판 과제

---

## ✅ 실행 가이드

### 1. 프로젝트 설치 및 실행

```bash
git clone https://github.com/iamyenachoi/BIGS_MISSION.git
cd BIGS_
npm install
npm run dev
```

접속 주소: http://localhost:5173

---

## 🧱 사용 기술

- React (Vite 기반)
- React Router
- Styled-components
- 일반 CSS (LoginPopup.css 등)
- JWT 인증 (localStorage 사용)
- 외부 API 연동 (Postman 문서 기반)

---

## ✨ 구현 기능

- 회원가입 / 로그인
- JWT 토큰 저장 및 인증 요청
- 게시글 목록 조회, 작성, 수정, 삭제
- 카테고리 필터 및 페이지네이션
- 비로그인 접근 제한 처리
- 반응형 UI

---

## 🔗 API 문서

https://documenter.getpostman.com/view/18478200/2sAY4vfh1u#intro

---

## 🛠️ 오류 해결

```bash
npm install react-icons          # 아이콘 오류
npm run dev -- --port 3000       # 포트 충돌 시
```

---

## 📌 제출 전 체크리스트

- ✅ `npm install` 및 `npm run dev`로 실행 가능
- ✅ 로그인 및 글쓰기 등 모든 기능 정상 작동
- ✅ 반응형 UI 정상
- ✅ README.md 포함됨




# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
