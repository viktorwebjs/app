import {
  getUser,
  clearUser,
  clearToken,
} from '../../shared/services/local-storage-service';
import { ROUTS } from '../../shared/constants/routs';
import { getTodos } from '../../api/api-handlers';
import { Todo } from '../todo/todo';

export const mainPageHandler = async () => {
  const headerUserName = document.getElementById('userName');
  const headerEmail = document.getElementById('email');
  const todoWrapper = document.querySelector('.main__todos');
  const logoutBtn = document.getElementById('logout');
  const findUser = document.getElementById('find_user');
  let todos = [];
  const { firstName, lastName, email } = getUser();

  // headerEmail.innerText = email;
  // headerUserName.innerText = `${firstName} ${lastName}`;

  await getTodos().then((todosArr) => {
    todos = Object.keys(todosArr).map((key) => {
      const todo = { id: key, ...todosArr[key] };

      todoWrapper.append(new Todo(todo).getTodo());

      return todo;
    });
  });

  logoutBtn.onclick = () => {
    clearUser();
    clearToken();

    window.location.href = ROUTS.sign_in;
  };
  findUser.onclick = () => {
    window.location.href = ROUTS.find_users;
  };
};
