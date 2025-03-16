import { takeEvery, put, delay } from "redux-saga/effects";
import { increment } from "../slice/counter_slice";

//redux-saga는 비동기 처리를 위해서 사용하는 middleware함수입니다
//API를 읽어오거나 할 때 비동기 처리를 해야하므로, 여기서 처리합니다
//chat-saga.txt를 보면 API를 읽어오는 방식이 있습니다
/*

function* findInDicSaga(action) {
  const socketId = yield select(selectSocketId);

  if (action.payload.type === "message") {
    try {
      console.time("api");
      const word = action.payload.chat;
      if (socketId === action.payload.socketId) {
        yield put(
          setInputWord({ gpt: action.payload.chat, ...action.payload })
        );
      } else {
        const chatgpt = yield call(filter_text, {
          chat: word,
          api_key: "4336a62ab2069cee31110575ac69c0dc",
          option: action.payload.option,
        });
        yield put(setInputWord({ gpt: chatgpt.result, ...action.payload }));
      }
      console.timeEnd("api");
    } catch (e) {
      console.log(e);
      yield put(setInputWord({ ...action.payload }));
    }
  } else {
    yield put(setInputWord({ ...action.payload }));
  }
}

*/

function* handleIncrementAsync() {
  yield delay(1000); // 1초 후 실행 (비동기 수행)
  yield put(increment()); //put(action) (Redux 액션 디스패치) = counter slice의 increment액션(함수)를 가져온다는 뜻

  /*
const socketId = yield select(selectSocketId);
 여기서 사용하는 select는 put과 다르게 액션(함수)를 가져오는게 아니라 Store의 "상태(변수)"를 가져옴
*/
}

/*
const chatgpt = yield call(filter_text, {
          chat: word,
          api_key: "4336a62ab2069cee31110575ac69c0dc",
          option: action.payload.option,
        });
        yield put(setInputWord({ gpt: chatgpt.result, ...action.payload }));

여기서 사용하는 Call은 비동기 함수를 호출(실행)
filter_text라는 임의의 custom REST API를 호출(보면 openAPI의 api를 호출하는 함수임)
*/

/*
takeEvery(action.type, sagaFunction)
모든 해당 액션을 감지하고 sagaFunction을 실행하는 함수 >> API가 여러번 중복해서 요청되어도 다 처리해버림 이거보단
takeLatest를 쓰면 마지막 요청만 인지함
이 외에도 많음
 **  takeLatest(action.type, sagaFunction)
가장 마지막으로 실행된 액션만 처리하고, 이전 실행 중이던 Saga는 취소됨

 ** takeLeading(action.type, sagaFunction)
가장 처음 실행된 Saga만 실행하고, 이후 요청은 무시됨
*/

//counter 리듀서의 incrementAsync 액션이 발생하면 이를 낚아채서 handleIncrementAsync 함수를 실행하는 미들웨어
export function* counterSaga() {
  yield takeEvery("counter/incrementAsync", handleIncrementAsync);
}
