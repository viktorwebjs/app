// import { initializeApp } from 'firebase/app';
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from 'firebase/auth';

// import { FIREBASE_CONFIG, AUTH_URL, DB_URL } from './src/api/api-config';
import './src/style/style.scss';

import { PATHNAMES, ROUTS } from './src/shared/constants/routs';
import { signInHandler } from './src/components/sign-in/sign-in';
import { signUpHandler } from './src/components/sign-up/sign-up';
import { getToken, getUser } from './src/shared/services/local-storage-service';
import { mainPageHandler } from './src/components/main/main';
import { findUserHandler } from './src/components/find-users/find-users';

const routerMap = new Map([
  [PATHNAMES.home, () => (window.location.href = ROUTS.sign_in)],
  [PATHNAMES.sign_in, () => signInHandler()],
  [PATHNAMES.sign_up, () => signUpHandler()],
  [
    PATHNAMES.main,
    () => {
      !getToken() && !getUser()
        ? (window.location.href = ROUTS.sign_in)
        : mainPageHandler();
    },
  ],
  [PATHNAMES.find_users, () => findUserHandler()],
]);

window.onload = () => {
  const pathname = window.location.pathname;

  routerMap.get(pathname)();
};

// const app = initializeApp(FIREBASE_CONFIG);
// const auth = getAuth();

// createUserWithEmailAndPassword(auth, 'test3@gmail.com', '111111')
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     console.log("object :>> ", userCredential);
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

// const auth = getAuth();
// signInWithEmailAndPassword(auth, 'test2@gmail.com', '111111')
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     console.log(user);
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });

// fetch(AUTH_URL, {
//   method: "POST",
//   headers: {
//     "Content-Type": "aplication/json",
//   },
//   body: JSON.stringify({
//     email: "test4@gmail.com",
//     password: "123456",
//   }),
// }).then((response) => console.log("respo", response));

// const creatTodo = () => {
//   fetch(`${DB_URL}/todos.json`, {
//     method: 'POST',
//     body: JSON.stringify({
//       title: 'My todo 4',
//       description: 'Do smth4',
//     }),
//   })
//     .then((responce) => responce.json())
//     .then((responce) => console.log(responce));
// };
// creatTodo();

// const getTodos = () => {
//   fetch(`${DB_URL}/todos.json`)
//     .then((responce) => responce.json())
//     .then((responce) => console.log(responce));
// };
// getTodos();

// const getTodos = () => {
//   fetch(`${DB_URL}/todos.json`)
//     .then((res) => res.json())
//     .then((responce) => {
//       console.log(responce);
//       const todos = Object.keys(responce).map((key) => {
//         return {
//           id: key,
//           ...responce[key],
//         };
//       });
//       console.log('todos', todos);
//     });
// };

// getTodos();

// let result = [];

// const getTodos = () => {
//   fetch(`${DB_URL}/todos/-MySlfsWol7uHuxGuqAv.json`)
//     .then((responce) => responce.json())
//     .then((responce) => console.log(responce));
// };
// getTodos();

// const updateTodo = () => {
//   fetch(`${DB_URL}/todos/-MySlfsWol7uHuxGuqAv.json`, {
//     method: 'PUT',
//     body: JSON.stringify({
//       title: 'My todo 2222',
//       description: 'Do smth',
//     }),
//   });
// };
// updateTodo();

// const deletTodo = () => {
//   fetch(`${DB_URL}/todos/-MySlfsWol7uHuxGuqAv.json`, {
//     method: 'DELETE',
//   });
// };
// deletTodo();
