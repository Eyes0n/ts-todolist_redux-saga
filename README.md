# ts-todolist_redux-saga

## redux와redux saga 적용

기존에 작업한 프로젝트에 `redux` 와 `redux saga` 를 적용시켰습니다.

`contextAPI`와 `useReducer`조합에서 `redux & redux-saga`로 전환했습니다.

`ducks pattern`으로 redux를 작성했습니다.

기존 리액트 프로젝트에 관한 README는 [여기서](https://github.com/team2-freeOnBorading/modu-todo) 보실 수 있습니다.

## 기능 이미지

### Todos 불러오기
![loadTodos](https://user-images.githubusercontent.com/45257139/131695318-a34eb778-f0cc-4bc3-9db0-1a4b9ef7b91e.png)
첫번째 이미지는 서버에 임의로 넣어둔 todos를 불러옵니다.

### 새로운 Todo 생성
![createTodo](https://user-images.githubusercontent.com/45257139/131695931-076a58ac-ba4c-4362-9091-c115f9313da9.png)
두번째 이미지는 "new todo"라는 task를 가진 Todo아이템을 새로 추가합니다.

### Todo 수정
![updateTodo](https://user-images.githubusercontent.com/45257139/131696052-188993ab-33aa-41b7-a3b7-b02635f847f2.png)
새로 추가된 `new todo`를 `modified Todo`로 수정하고 
진행 상황을 `TODO`에서 `IN_PROGRESS`로 중요도를 `LOW`에서 `MEDIUM`으로 수정했습니다.

### Todo 삭제
![deleteTodo](https://user-images.githubusercontent.com/45257139/131696121-52bda121-9424-4627-afbb-b41d702cca0c.png)
수정된 todo를 삭제했습니다.

<br/>

## 실행 방법

해당 프로젝트를 클론해주세요.

back폴도로 이동하신 다음 관련 패키지를 설치 후 server를 실행(`npm start`)해주세요.

그다음에 front폴더로 이동하신 다음에 관련 패키지를 설치 후 react를 실행(`npm start`)해주시면 됩니다.

```js
git clone https://github.com/Eyes0n/ts-todolist_redux-saga.git

cd back
npm install
npm start
```

```js
cd front
npm install
npm start
```

## 폴더 구조

front와 back으로 나누어서 진행했습니다.

front에는 react & typescript로 작성되어 있습니다.

back에는 express & typescript로 작성했습니다.
