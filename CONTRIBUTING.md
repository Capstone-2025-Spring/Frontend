# 🫠 Capstone-Design-2025-Spring 코드 콘벤션 및 프로젝트 구조

이 문서는 `frontend/` 디렉토리 내 코드 구조, 코드 컨벤션 및 스타일을 정의합니다.  
**기본적으로로 `ESLint & Prettier`를 사용합니다.**

## \*\*📌 1. 코드 구조 (`frontend/`)

아래와 같은 **Flux 아키텍쳐 기반의 디렉토리 구조**를 따릅니다.
아래는 redux, redux-saga 를 사용한 Flux 아키텍쳐에 익숙해질 수 있게 튜토리얼 counter를 작성한 예제입니다
각 파일마다 주석을 달아놨으니 읽어보면 편할거에요

```
frontend/src/
│── component/         # UI 컴포넌트 (Redux와 분리됨)
│   ├── Counter.js     # Counter UI 컴포넌트. UI는 여기서만 다룹니다다
│
│── container/         # Redux와 연결된 컨테이너 컴포넌트. useSelector와 useDispatch를 사용해서 데이터를 가져옵니다다
│   ├── CounterContainer.js
│
│── module/            # Redux Slice & Redux-Saga 모듈
│   ├── slice/
│   │   ├── counter_slice.js  # Redux 상태 및 액션 관리
│   ├── saga/
│   │   ├── counter_saga.js   # Redux-Saga를 통한 비동기 처리
│   ├── index.js              # Redux Slice & Saga를 한 곳에서 관리
│
│── store/             # Redux Store 설정
│   ├── store.js       # Redux Store 및 미들웨어 설정
│
│── App.js             # 메인 컴포넌트
│── index.js           # Redux Provider 설정

```

---

## **📌 2. 코드 컨벤션**

### ✅ 2.1 **클래스명 (PascalCase)**

- 모든 클래스명은 `PascalCase`를 사용해야 한다.

✅ **예제**

```javascript
// UI 컨퍼넌트
class ToolBlock extends React.Component {
  render() {
    return <div>ToolBlock</div>;
  }
}
```

---

### ✅ 2.2 **함수 및 변수명 (snake_case)**

- **모든 함수와 파라미터는 `snake_case`를 사용한다.**

✅ **예제**

```javascript
// 함수
function fetch_user_data() {
  return fetch("/api/users");
}

// UI 이벤트 해당
function add_tool_block() {}

function load_image() {}
```
