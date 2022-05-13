import { getTodos } from '../../api/api-handlers';
import { Todo } from '../todo/todo';
import { Header } from '../header/header';
import { Spinner } from '../../shared/spinner';
import { createTodo } from '../../api/api-handlers';
import { async } from '@firebase/util';
import { showNotification } from '../../shared/notifications';
import { getUser } from '../../shared/services/local-storage-service';

export const mainPageHandler = async () => {
  const mainDiv = document.querySelector('.sect');
  const title = document.getElementById('title');
  const description = document.getElementById('description');
  const submitBtn = document.getElementById('submitBtn');
  const newTodo = {
    title: '',
    description: '',
  };
  const checkIsNewTodoValid = () => {
    Object.values(newTodo).every((value) => !!value)
      ? submitBtn.removeAttribute('disabled')
      : submitBtn.setAttribute('disabled', true);
  };

  Header.getHeader(mainDiv);
  Spinner.showSpinner();

  const todoWrapper = document.querySelector('.main__todos');
  let todos = [];

  const renderTodos = (todosArr) => {
    if (todosArr) {
      const id = getUser().authId;

      todos = [];
      todoWrapper.innerHTML = null;
      todos = Object.keys(todosArr).map((key) => {
        const todo = { id: key, ...todosArr[key] };
        if (todo.userId === id) {
          todoWrapper.append(new Todo(todo).getTodo());
        }

        return todo;
      });
    }
  };

  await getTodos()
    .then((todosArr) => {
      Spinner.hideSpinner();
      renderTodos(todosArr);
    })
    .catch((error) => {
      Spinner.hideSpinner();
      showNotification(error.message);
    });

  title.oninput = () => {
    newTodo.title = title.value;
    checkIsNewTodoValid();
  };

  description.oninput = () => {
    newTodo.description = description.value;
    checkIsNewTodoValid();
  };

  submitBtn.onclick = async () => {
    Spinner.showSpinner();
    await createTodo({ ...newTodo, date: new Date(), userId: getUser().authId })
      .then((response) => {
        Spinner.hideSpinner();
        title.value = null;
        description.value = null;
      })
      .catch((error) => {
        Spinner.hideSpinner();
        showNotification(error.message);
      });
  };
};
