import React from "react";
import { useRoutes } from "react-router-dom";
import routerMap from "./router";
import ErrorBoundary from "./components/ErrorBoundary";

import { CountProvider } from "./hooks/useCountProvider";

import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

// 定义一个saga
const Api = {
  fetchUser: (userId) => {
    console.log("fetchUser", userId);
    return { name: "name" + userId };
  },
};
function* fetchUser(action) {
  try {
    const user = yield call(Api.fetchUser, action.payload.userId);
    yield put({ type: "USER_FETCH_SUCCEEDED", user: user });
  } catch (e) {
    yield put({ type: "USER_FETCH_FAILED", message: e.message });
  }
}
function* mySaga() {
  console.log("mySaga");
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

// 注册saga
// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const reducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "USER_FETCH_SUCCEEDED":
      return { ...state, user: action.user };
    case "USER_FETCH_FAILED":
      return { ...state, message: action.message };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// Then run the saga
sagaMiddleware.run(mySaga);

function App() {
  const elements = useRoutes(routerMap);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <CountProvider> {elements} </CountProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
