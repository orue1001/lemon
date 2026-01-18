# Lemon - React + Vite 프로젝트

## 프로젝트 개요
**Lemon** 프로젝트는 **React 19**로 구축되고 **Vite**를 사용하여 번들링된 웹 애플리케이션입니다. Hot Module Replacement (HMR)와 최적화된 빌드 프로세스를 갖춘 현대적이고 빠른 프런트엔드 개발 환경을 제공합니다.

## 시작하기

### 필수 조건
- Node.js (최신 LTS 권장)
- npm (Node 패키지 관리자)

### 설치
프로젝트 종속성을 설치합니다:
```bash
npm install
```

## 주요 스크립트

개발 및 프로덕션 작업을 위해 `package.json`에서 다음 스크립트를 사용할 수 있습니다:

| 명령어 | 설명 |
| :--- | :--- |
| `npm run dev` | HMR이 포함된 로컬 개발 서버를 시작합니다. |
| `npm run build` | 프로덕션을 위해 애플리케이션을 빌드하여 `dist` 디렉토리에 생성합니다. |
| `npm run lint` | ESLint를 실행하여 코드 품질 및 스타일 문제를 확인합니다. |
| `npm run preview` | `npm run build`로 생성된 프로덕션 빌드를 로컬에서 미리 봅니다. |

## 프로젝트 구조

- **`src/`**: 소스 코드를 포함합니다.
    - **`main.jsx`**: 애플리케이션 진입점(entry point)입니다.
    - **`App.jsx`**: 메인 루트 컴포넌트입니다.
    - **`assets/`**: 이미지 및 SVG와 같은 정적 자산입니다.
- **`public/`**: 그대로 제공되는 정적 자산입니다 (예: `vite.svg`).
- **`vite.config.js`**: Vite 구성 파일입니다.
- **`eslint.config.js`**: ESLint용 플랫 구성 파일입니다.

## 개발 규칙 (Conventions)

- **프레임워크**: 함수형 컴포넌트와 Hooks를 사용하는 React 19.
- **스타일링**: 컴포넌트로 직접 가져오는 표준 CSS 파일 (예: `App.css`, `index.css`).
- **린팅 (Linting)**: 
    - `eslint-plugin-react-hooks` 및 `eslint-plugin-react-refresh`가 포함된 ESLint로 관리됩니다.
    - 구성은 `eslint.config.js`에 위치합니다.
    - `dist` 디렉토리는 전역적으로 무시됩니다.
- **파일 명명 규칙**: 
    - 컴포넌트는 PascalCase를 사용합니다 (예: `App.jsx`).
    - 구성 파일은 camelCase 또는 kebab-case를 사용합니다.