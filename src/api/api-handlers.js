import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { showNotification } from '../shared/notifications';
import { Spinner } from '../shared/spinner';

import { FIREBASE_CONFIG, DB_URL } from './api-config';

const app = initializeApp(FIREBASE_CONFIG);
const auth = getAuth();

export const signInRequest = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const creatUserAuthRequest = ({ email, password1 }) => {
  return createUserWithEmailAndPassword(auth, email, password1);
};

export const creatUserDataRequest = (user) => {
  const userData = user;
  delete userData.password1;
  delete userData.password2;

  return fetch(`${DB_URL}/users.json`, {
    method: 'POST',
    body: JSON.stringify(user),
  }).then((res) => res.json());
};

// export const getUsers = () => {
//   return fetch(`${DB_URL}/users.json`).then((response) => response.json());
// };

// export const getUser = (id) => {
//   return fetch(`${DB_URL}/users/${id}.json`).then((response) =>
//     response.json()
//   );
// };

// export const getTodos = () =>
//   fetch(`${DB_URL}/todos.json`).then((response) => response.json());

// export const createTodo = (todo) => {
//   return fetch(`${DB_URL}/todos.json`, {
//     method: 'POST',
//     body: JSON.stringify(todo),
//   }).then((response) => response.json());
// };

export const updateTodo = (todo, id) => {
  return fetch(`${DB_URL}/todos/${id}.json`, {
    method: 'PUT',
    body: JSON.stringify(todo),
  }).then((response) => response.json());
};

// export const deleteTodo = (id) => {
//   return fetch(`${DB_URL}/todos/${id}.json`, {
//     method: 'DELETE',
//   }).then((response) => response.json());
// };

export const createComment = (comment) => {
  return fetch(`${DB_URL}/comments.json`, {
    method: 'POST',
    body: JSON.stringify(comment),
  }).then((response) => response.json());
};
/********************** */

const get = (url) => {
  return fetch(`${DB_URL}/${url}.json`)
    .then((response) => {
      Spinner.hideSpinner();

      return response.json();
    })
    .catch((error) => {
      Spinner.hideSpinner();
      showNotification(error.message);
    });
};

const put = (url, body) => {
  return fetch(`${DB_URL}/${url}.json`, {
    method: 'PUT',
    body: JSON.stringify(body),
  })
    .then((response) => {
      Spinner.hideSpinner();

      return response.json();
    })
    .catch((error) => {
      Spinner.hideSpinner();
      showNotification(error.message);
    });
};

const del = (url) => {
  return fetch(`${DB_URL}/${url}.json`, {
    method: 'DELETE',
  })
    .then((response) => {
      Spinner.hideSpinner();

      return response.json();
    })
    .catch((error) => {
      Spinner.hideSpinner();
      showNotification(error.message);
    });
};

const post = (url, body) => {
  return fetch(`${DB_URL}/${url}.json`, {
    method: 'POST',
    body: JSON.stringify(body),
  })
    .then((response) => {
      Spinner.hideSpinner();

      return response.json();
    })
    .catch((error) => {
      Spinner.hideSpinner();
      showNotification(error.message);
    });
};

export const apiService = {
  get,
  put,
  del,
  post,
};
