# 🫠 Capstone-Design-2025-Spring 코드 콘벤션 및 프로젝트 구조

이 문서는 `frontend/` 디렉토리 내 코드 구조, 코드 컨벤션 및 스타일을 정의합니다.  
**기본적으로로 `ESLint & Prettier`를 사용합니다.**

## \*\*📌 1. 코드 구조 (`frontend/`)

아래와 같은 **Flux 아키텍쳐 기반의 디렉토리 구조**를 따릅니다.

```
frontend/
🔸 src/
    🔸 components/      # UI/UX 컨포넌트
    🔸 containers/      # 컨테이너 컨포넌트 (Redux 연결)
    🔸 lib/             # 공용 함수 및 유틸리티티
    🔸 modules/         # Redux Toolkit Slice (리듀서 & 액션 관리)
    🔸 store/           # Redux 스토어 설정
    🔸 styles/          # CSS 및 스타일
    🔸 App.js           # 메인 컨포넌트
    🔸 index.js         # 진입점 (Provider 설정)
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
