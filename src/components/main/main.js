import { apiService } from '../../api/api-handlers';
import { Todo } from '../todo/todo';
import { Header } from '../header/header';
import { Spinner } from '../../shared/spinner';
import { getUserLocal } from '../../shared/services/local-storage-service';
import { Modal } from '../../shared/modal';
import { MODAL_MESSAGES } from '../../shared/constants/modalMessages';

export const mainPageHandler = async () => {
  const mainDiv = document.querySelector('.sect');
  const todoWrapper = document.querySelector('.main__todos');
  const title = document.getElementById('title');
  const description = document.getElementById('description');
  const submitBtn = document.getElementById('submitBtn');
  const cancelBtn = document.getElementById('cancelBtn');

  const newTodo = {
    title: '',
    description: '',
  };

  let todos = [];
  let isEditMode = false;
  let editingTodoId = '';
  let deletingTodoId = '';

  const clearForm = () => {
    newTodo.title = '';
    newTodo.description = '';
    title.value = null;
    description.value = null;
  };

  const editTodoHandler = (todoId) => {
    const findingTodo = todos.find(({ id }) => id === todoId);
    editingTodoId = todoId;
    cancelBtn.style.display = 'inline';
    isEditMode = true;
    submitBtn.innerText = 'Save';
    title.value = findingTodo.title;
    newTodo.title = findingTodo.title;
    newTodo.description = findingTodo.description;
    description.value = findingTodo.description;
    checkIsFormValid();
  };

  const deleteSelectedTodo = async () => {
    Spinner.showSpinner();
    await apiService.del(`todos/${deletingTodoId}`).then((response) => {});
    await apiService.get(`todos`).then((todosArr) => {
      renderTodos(todosArr);
    });
  };

  const deleteTodoHandler = (todoId) => {
    deletingTodoId = todoId;
    new Modal(MODAL_MESSAGES.deletetodo, deleteSelectedTodo).showModal();
  };

  const renderTodos = (todosArr) => {
    if (todosArr) {
      const id = getUserLocal().authId;

      todos = [];
      todoWrapper.innerHTML = null;
      todos = Object.keys(todosArr).map((key) => {
        const todo = { id: key, ...todosArr[key] };
        if (todo.userId === id) {
          todoWrapper.append(
            new Todo(
              todo,
              editTodoHandler,
              deleteTodoHandler,
              setIsComplete
            ).getTodo()
          );
        }

        return todo;
      });
    } else {
      todoWrapper.innerHTML = null;
    }
  };

  const checkIsFormValid = () => {
    Object.values(newTodo).every((value) => !!value)
      ? submitBtn.removeAttribute('disabled')
      : submitBtn.setAttribute('disabled', true);
  };

  const setIsComplete = (isComplete, todoId) => {
    console.log(isComplete, todoId);
    const findingTodo = todos.find((todo) => todo.id === todoId);

    updateCurrentTodo({ ...findingTodo, isComplete }, todoId);
  };

  const creatNewTodo = async () => {
    Spinner.showSpinner();
    const todo = {
      ...newTodo,
      date: new Date(),
      userId: getUserLocal().authId,
      isComplete: false,
      comments: [],
    };

    await apiService.post('todos', todo).then((response) => clearForm());

    await apiService.get(`todos`).then((todosArr) => renderTodos(todosArr));
  };

  const updateCurrentTodo = async (todo, id) => {
    await apiService.put(`todos${id}`, todo).then((response) => {
      // Spinner.hideSpinner();
      clearForm();
    });

    await apiService.get(`todos`).then((todosArr) => {
      renderTodos(todosArr);
    });
  };

  title.oninput = () => {
    newTodo.title = title.value;
    checkIsFormValid();
  };

  submitBtn.onclick = async () => {
    if (isEditMode) {
      const findingTodo = todos.find((todo) => todo.id === editingTodoId);
      const todoToRequest = {
        ...findingTodo,
        ...newTodo,
        date: new Date(),
        userId: getUserLocal().authId,
      };
      updateCurrentTodo(todoToRequest, editingTodoId);
      console.log(todoToRequest);
    } else {
      creatNewTodo();
    }
  };

  description.oninput = () => {
    newTodo.description = description.value;
    checkIsFormValid();
  };

  cancelBtn.onclick = () => {
    isEditMode = false;
    newTodo.title = '';
    newTodo.description = '';
    title.value = null;
    description.value = null;
    cancelBtn.style.display = 'none';
    submitBtn.innerText = 'CREAT TODO';
  };

  Header.getHeader(mainDiv);
  Spinner.showSpinner();
  await apiService.get(`todos`).then((todosArr) => {
    renderTodos(todosArr);
  });
};

// import { getTodos } from '../../api/api-handlers';
// import { Todo } from '../todo/todo';
// import { Header } from '../header/header';
// import { Spinner } from '../../shared/spinner';
// import { createTodo, updateTodo } from '../../api/api-handlers';
// import { showNotification } from '../../shared/notifications';
// import { getUser } from '../../shared/services/local-storage-service';

// export const mainPageHandler = async () => {
//   const mainPage = document.querySelector('.main');
//   const todoWrapper = document.querySelector('.main__todos');
//   const title = document.getElementById('title');
//   const description = document.getElementById('description');
//   const submitBtn = document.getElementById('submitBtn');
//   const cancelBtn = document.getElementById('cancelBtn');

//   const newTodo = {
//     title: '',
//     description: '',
//   };

//   let todos = [];
//   let isEditMode = false;
//   let editingTodoId = '';

//   const clearForm = () => {
//     newTodo.title = '';
//     newTodo.description = '';
//     title.value = null;
//     description.value = null;
//   };

//   const editTodoHandler = (todoId) => {
//     const findingTodo = todos.find(({ id }) => id === todoId);

//     editingTodoId = todoId;
//     cancelBtn.style.display = 'inline';
//     isEditMode = true;
//     submitBtn.innerText = 'Save';
//     title.value = findingTodo.title;
//     newTodo.title = findingTodo.title;
//     description.value = findingTodo.description;
//     newTodo.description = findingTodo.description;
//     checkIsFormValid();
//   };

//   Header.getHeader(mainPage);
//   const renderTodos = (todosArr) => {
//     if (todosArr) {
//       const id = getUser().authId;

//       todos = [];
//       todoWrapper.innerHTML = null;
//       todos = Object.keys(todosArr).map((key) => {
//         const todo = { id: key, ...todosArr[key] };

//         if (todo.userId === id) {
//           todoWrapper.append(new Todo(todo, editTodoHandler).getTodo());
//         }

//         return todo;
//       });
//     }
//   };

//   const checkIsFormValid = () =>
//     Object.values(newTodo).every((value) => !!value)
//       ? submitBtn.removeAttribute('disabled')
//       : submitBtn.setAttribute('disabled', true);

//   const createNewTodo = async () => {
//     Spinner.showSpinner();
//     await createTodo({ ...newTodo, date: new Date(), userId: getUser().authId })
//       .then((response) => {
//         Spinner.hideSpinner();
//         clearForm();
//       })
//       .catch((error) => {
//         Spinner.hideSpinner();
//         showNotification(error.message);
//       });
//     await getTodos()
//       .then((todosArr) => {
//         Spinner.hideSpinner();
//         renderTodos(todosArr);
//       })
//       .catch((error) => {
//         Spinner.hideSpinner();
//         showNotification(error.message);
//       });
//   };

//   const updateCurrentTodo = async () => {
//     Spinner.showSpinner();
//     await updateTodo(
//       { ...newTodo, date: new Date(), userId: getUser().authId },
//       editingTodoId
//     )
//       .then((response) => {
//         clearForm();
//       })
//       .catch((error) => {
//         Spinner.hideSpinner();
//         showNotification(error.message);
//       });
//     await getTodos()
//       .then((todosArr) => {
//         Spinner.hideSpinner();
//         renderTodos(todosArr);
//       })
//       .catch((error) => {
//         Spinner.hideSpinner();
//         showNotification(error.message);
//       });
//   };

//   title.oninput = () => {
//     newTodo.title = title.value;
//     checkIsFormValid();
//   };

//   description.oninput = () => {
//     newTodo.description = description.value;
//     checkIsFormValid();
//   };

//   submitBtn.onclick = async () => {
//     isEditMode ? updateCurrentTodo() : createNewTodo();
//   };

//   cancelBtn.onclick = () => {
//     clearForm();
//     isEditMode = false;
//     cancelBtn.style.display = 'none';
//     submitBtn.innerText = 'Create Todo';
//   };

//   Spinner.showSpinner();
//   await getTodos()
//     .then((todosArr) => {
//       Spinner.hideSpinner();
//       renderTodos(todosArr);
//     })
//     .catch((error) => {
//       Spinner.hideSpinner();
//       showNotification(error.message);
//     });
// };
