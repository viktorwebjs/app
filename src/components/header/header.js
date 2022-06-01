import {
  getUserLocal,
  clearUser,
  clearToken,
} from '../../shared/services/local-storage-service';
import { ROUTS } from '../../shared/constants/routs';
import { Modal } from '../../shared/modal';
import { MODAL_MESSAGES } from '../../shared/constants/modalMessages';
export class Header {
  // constructor() {}

  static getHeader(target) {
    if (Object.values(getUserLocal()).length) {
      const header = document.createElement('div');
      const headerLogo = document.createElement('div');
      const headerTitle = document.createElement('p');
      const headerUser = document.createElement('div');
      const headerUserInfo = document.createElement('div');
      const headerUserName = document.createElement('p');
      const headerUserEmail = document.createElement('p');
      const headerUserPhoto = document.createElement('div');
      const headerUserFindUserButton = document.createElement('button');
      const headerUserLogoutButton = document.createElement('button');
      const { firstName, lastName, email } = getUserLocal();

      headerUserEmail.innerText = email;
      headerUserName.innerText = `${firstName} ${lastName}`;

      header.className = 'header';
      headerLogo.className = 'header__logo';
      headerUser.className = 'header__user';
      headerUserInfo.className = 'header__user__info';
      headerUserPhoto.className = 'header__user__photo';
      headerUserFindUserButton.className = 'btn btn-success';
      headerUserLogoutButton.className = 'btn btn-success';
      headerTitle.innerText = 'TODO LIST';
      headerUserFindUserButton.innerText = 'Find User';
      headerUserLogoutButton.innerText = 'LOGOUT';

      headerTitle.onclick = () => {
        window.location.href = ROUTS.main;
      };

      headerLogo.append(headerTitle);
      headerUserInfo.append(headerUserName, headerUserEmail);
      headerUser.append(
        headerUserInfo,
        headerUserPhoto,
        headerUserFindUserButton,
        headerUserLogoutButton
      );
      header.append(headerLogo, headerUser);

      headerUserLogoutButton.onclick = () => {
        // clearUser();
        // clearToken();
        // window.location.href = ROUTS.sign_in;
        // this.logout();
        new Modal(MODAL_MESSAGES.logout, this.logout).showModal();
      };

      headerUserFindUserButton.onclick = () => {
        window.location.href = ROUTS.find_users;
      };

      target.append(header);

      return header;
    } else this.logout();
  }
  static logout() {
    clearUser();
    clearToken();
    window.location.href = ROUTS.sign_in;
  }
}
