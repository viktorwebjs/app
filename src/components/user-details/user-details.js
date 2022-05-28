import * as moment from 'moment';
import { Spinner } from '../../shared/spinner';
import { Header } from './../header/header';
import { getUser, getTodos } from './../../api/api-handlers';
import { getCurrentUserData } from '../../shared/services/local-storage-service';
import { showNotification } from '../../shared/notifications';

export const userDetailsHandler = async () => {
  const header = document.querySelector('.sect');

  const firstNameTag = document.getElementById('firstName');
  const lastNameTag = document.getElementById('lastName');
  const birthTag = document.getElementById('birth');
  const emailTag = document.getElementById('email');
  //   const userPhoto = document.getElementById('user_photo');

  const renderTodos = (todosObj) => {
    const authId = getCurrentUserData().authId;
    const todos = Object.keys(todosObj)
      .map((key) => ({
        id: key,
        ...todosObj[key],
      }))
      .filter((todo) => todo.userId === authId);
    // console.log(todos);
  };

  Header.getHeader(header);
  Spinner.showSpinner();
  await getUser(getCurrentUserData().userId)
    .then(({ firstName, lastName, email, birth }) => {
      Spinner.hideSpinner();
      firstNameTag.innerText = firstName;
      lastNameTag.innerText = lastName;
      birthTag.innerText = moment(birth).format('LL');
      emailTag.innerText = email;
    })
    .catch((error) => {
      Spinner.hideSpinner();
      showNotification(error.message);
    });

  Spinner.showSpinner();
  await getTodos()
    .then((todos) => {
      Spinner.hideSpinner();
      renderTodos(todos);

      console.log(todos);
    })
    .catch((error) => {
      Spinner.hideSpinner();
      showNotification(error.message);
    });
};
