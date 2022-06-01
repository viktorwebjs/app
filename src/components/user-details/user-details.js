import * as moment from 'moment';

import { Header } from '../header/header';
import { apiService } from '../../api/api-handlers';
import {
  getCurrentUserData,
  getUserLocal,
} from '../../shared/services/local-storage-service';
import { Spinner } from '../../shared/spinner';
import { showNotification } from '../../shared/notifications';

export const userDetailsHandler = async () => {
  const header = document.querySelector('.sect');
  const userDetails = document.querySelector('.user-details');
  const firstNameTag = document.getElementById('firstName');
  const lastNameTag = document.getElementById('lastName');
  const emailTag = document.getElementById('email');
  const birthTag = document.getElementById('birth');
  const photoWrapper = document.querySelector('.user-details__info__photo');
  const todosContainer = document.querySelector('.user-details__todos');

  const renderTodos = (todosObj) => {
    const authId = getCurrentUserData().authId;
    const todos = Object.keys(todosObj)
      .map((key) => ({ id: key, ...todosObj[key] }))
      .filter((todo) => todo.userId === authId);

    todos.forEach((todo) => {
      const { title, description, date, id } = todo;
      const todoItem = document.createElement('div');
      const todoItemTitle = document.createElement('p');
      const todoItemDescription = document.createElement('p');
      const todoItemDate = document.createElement('span');
      const commentContainer = document.createElement('div');
      const commentText = document.createElement('textarea');
      const submitCommentBtn = document.createElement('button');

      todoItemTitle.innerText = title;
      todoItemDescription.innerText = description;
      todoItemDate.innerText = moment(date).format('LLLL');
      submitCommentBtn.innerText = 'Comment';
      commentText.setAttribute('placeholder', 'Leave a comment here...');

      todoItem.className = 'user-details__todos__todo';
      commentText.className = 'form-control';
      commentContainer.className = 'user-details__todos__todo__comment';
      submitCommentBtn.className = 'btn btn-primary';

      submitCommentBtn.onclick = async () => {
        if (commentText.value) {
          let commentId;
          const comment = {
            date: new Date(),
            text: commentText.value,
            todoId: id,
            userId: getUserLocal().userId,
          };
          let newTodo;
          let comments;

          // await createComment(comment)
          await apiService
            .post('comments', comment)
            .then((response) => (commentId = response.name));
          comments = todo.comments || [];
          comments.push(commentId);

          newTodo = { ...todo, comments };
          // await updateTodo(newTodo, id)
          await apiService
            .put(`todos${id}`, newTodo)
            .then((res) => console.log(res));
        }
      };

      commentContainer.append(commentText, submitCommentBtn);
      todoItem.append(
        todoItemTitle,
        todoItemDate,
        todoItemDescription,
        commentContainer
      );
      todosContainer.append(todoItem);
    });
  };

  Header.getHeader(header);
  Spinner.showSpinner();
  // await getUser(getCurrentUserData().userId)
  await apiService
    .get(`users/${getCurrentUserData().userId}`)
    .then(({ firstName, lastName, email, birth }) => {
      const userPhoto = document.createElement('img');

      Spinner.hideSpinner();
      firstNameTag.innerText = firstName;
      lastNameTag.innerText = lastName;
      emailTag.innerText = email;
      birthTag.innerText = moment(birth).format('LL');
      userDetails.style.display = 'block';
      userPhoto.setAttribute('src', 'src/assets/png/alien-circle.png');
      photoWrapper.append(userPhoto);
    })
    .catch((error) => {
      Spinner.hideSpinner();
      showNotification(error.message);
    });
  Spinner.showSpinner();
  await apiService.get(`todos`).then((todos) => {
    renderTodos(todos);
  });
};

// import * as moment from 'moment';
// import { Spinner } from '../../shared/spinner';
// import { Header } from './../header/header';
// import {
//   getUsers,
//   getTodos,
//   createComment,
//   updateTodo,
// } from './../../api/api-handlers';
// import {
//   getCurrentUserData,
//   getUserLocal,
// } from '../../shared/services/local-storage-service';
// import { showNotification } from '../../shared/notifications';

// export const userDetailsHandler = async () => {
//   const header = document.querySelector('.sect');

//   const firstNameTag = document.getElementById('firstName');
//   const lastNameTag = document.getElementById('lastName');
//   const birthTag = document.getElementById('birth');
//   const emailTag = document.getElementById('email');
//   const todosContainer = document.querySelector('.user-details__todos');
//   //   const userPhoto = document.getElementById('user_photo');

//   const renderTodos = (todosObj) => {
//     const authId = getCurrentUserData().authId;
//     const todos = Object.keys(todosObj)
//       .map((key) => ({
//         id: key,
//         ...todosObj[key],
//       }))
//       .filter((todo) => todo.userId === authId);

//     todos.forEach(({ title, description, date, id }) => {
//       const todoItem = document.createElement('div');
//       const todoItemTitle = document.createElement('p');
//       const todoItemDescription = document.createElement('p');
//       const todoItemDate = document.createElement('span');
//       const commentContainer = document.createElement('div');
//       const commentText = document.createElement('textarea');
//       const submitCommentBtn = document.createElement('button');

//       todoItemTitle.innerText = title;
//       todoItemDescription.innerText = description;
//       submitCommentBtn.innerText = 'Comment';
//       todoItemDate.innerText = moment(date).format('llll');
//       commentText.className = 'form-control';
//       submitCommentBtn.className = 'btn btn-success';
//       commentContainer.className = 'user-details__todos__comment';
//       todoItem.className = 'user-details__todos__todo';
//       commentText.setAttribute('placeholder', 'Leave a comment here...');

//       submitCommentBtn.onclick = async () => {
//         if (commentText.value) {
//           let commentId;
//           const comment = {
//             date: new Date(),
//             text: commentText.value,
//             todoId: id,
//             userId: getUser().userId,
//           };
//         }
//         let newTodo;
//         let comments = [];
//         await createComment(comment).then(
//           (response) => (commentId = response.name)
//         );
//         comments = todo.comments || [];
//         comments.push(commentId);

//         newTodo = { ...todo, comments };
//         await updateTodo();
//       };
//       commentContainer.append(commentText, submitCommentBtn);
//       todoItem.append(
//         todoItemTitle,
//         todoItemDescription,
//         todoItemDate,
//         commentContainer
//       );
//       todosContainer.append(todoItem);
//     });
//   };

//   Header.getHeader(header);
//   Spinner.showSpinner();
//   await getUserLocal(getCurrentUserData().userId)
//     .then(({ firstName, lastName, email, birth }) => {
//       Spinner.hideSpinner();
//       firstNameTag.innerText = firstName;
//       lastNameTag.innerText = lastName;
//       birthTag.innerText = moment(birth).format('LL');
//       emailTag.innerText = email;
//     })
//     .catch((error) => {
//       Spinner.hideSpinner();
//       showNotification(error.message);
//     });

//   Spinner.showSpinner();
//   await getTodos()
//     .then((todos) => {
//       Spinner.hideSpinner();
//       renderTodos(todos);

//       console.log(todos);
//     })
//     .catch((error) => {
//       Spinner.hideSpinner();
//       showNotification(error.message);
//     });
// };
