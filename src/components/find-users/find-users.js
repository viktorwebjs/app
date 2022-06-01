import { Header } from '../header/header';
import { apiService } from '../../api/api-handlers';
import { Spinner } from '../../shared/spinner';
import { ROUTS } from '../../shared/constants/routs';
import { setCurrentUserData } from '../../shared/services/local-storage-service';

export const findUsersHandler = async () => {
  const header = document.querySelector('.sect');
  const find_users = document.querySelector('.find-users');
  const usersWrapper = document.getElementById('users');
  const first_name_table = document.querySelector(
    '.find-users__header__first-name'
  );
  const last_name_table = document.querySelector(
    '.find-users__header__last-name'
  );
  const email_table = document.querySelector('.find-users__header__email');
  const id_table = document.querySelector('.find-users__header__id');
  const search = document.getElementById('search');
  let users = [];

  const renderUsers = (users) => {
    const table_data_tags = document.querySelectorAll('.table-data');

    table_data_tags.forEach((tag) => tag.remove());

    users.forEach(({ firstName, lastName, email, userId, authId }) => {
      const firstNameValue = document.createElement('p');
      const lastNameValue = document.createElement('p');
      const emailValue = document.createElement('p');
      const idValue = document.createElement('p');
      const tags_array = [firstNameValue, lastNameValue, emailValue, idValue];

      firstNameValue.className = 'table-data';
      lastNameValue.className = 'table-data';
      emailValue.className = 'table-data';
      idValue.className = 'table-data';

      firstNameValue.innerText = firstName;
      lastNameValue.innerText = lastName;
      emailValue.innerText = email;
      idValue.innerText = userId;

      tags_array.forEach((tag) => {
        tag.onclick = () => {
          setCurrentUserData({ authId, userId });
          window.location.href = ROUTS.user_details;
        };
      });

      first_name_table.append(firstNameValue);
      last_name_table.append(lastNameValue);
      email_table.append(emailValue);
      id_table.append(idValue);
    });
  };

  search.oninput = () => {
    const searching_users = users.filter((user) =>
      user.firstName.startsWith(search.value)
    );

    renderUsers(searching_users);
  };

  Header.getHeader(header);
  Spinner.showSpinner();
  await apiService.get(`users`).then((response) => {
    users = Object.keys(response).map((userId) => ({
      ...response[userId],
      userId,
    }));
    renderUsers(users);
  });
};

// import { Header } from '../header/header';
// import { getUsers } from '../../api/api-handlers';
// import { Spinner } from '../../shared/spinner';
// import { showNotification } from '../../shared/notifications';

// export const findUsersHandler = async () => {
//   const header = document.querySelector('.sect');
//   const findUsers = document.querySelector('.findUsers');
//   const usersWrapper = document.getElementById('users');
//   const first_name_table = document.querySelector('.first_name');
//   const last_name_table = document.querySelector('.last_name');
//   const email_table = document.querySelector('.email');
//   const user_id_table = document.querySelector('.user_id');
//   const search = document.querySelector('.search');

//   let users = [];
//   const renderUsers = () => {
//     users.forEach(({ firstName, lastName, email, userId }) => {
//       const firstNameValue = document.createElement('p');
//       const lastNameValue = document.createElement('p');
//       const emailValue = document.createElement('p');
//       const userIdValue = document.createElement('p');

//       firstNameValue.innerText = firstName;
//       lastNameValue.innerText = lastName;
//       emailValue.innerText = email;
//       userIdValue.innerText = userId;

//       first_name_table.append(firstNameValue);
//       last_name_table.append(lastNameValue);
//       email_table.append(emailValue);
//       user_id_table.append(userIdValue);
//     });
//   };

//   search.oninput = () => {
//     users = users.filter(user.firstName.include(search.value));
//   };

//   Header.getHeader(header);
//   Spinner.showSpinner();
//   await getUsers()
//     .then((response) => {
//       users = Object.keys(response).map((userId) => ({
//         ...response[userId],
//         userId,
//       }));
//       renderUsers();
//       Spinner.hideSpinner();
//     })
//     .catch((error) => {
//       Spinner.hideSpinner();
//       showNotification(error.message);
//     });
// };
