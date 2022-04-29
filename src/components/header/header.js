export class Header {
  constructor() {}

  getHeaderTemplate() {
    // <div class="header">
    //   <div class="main__header__logo">
    //     <p>TODO LIST</p>
    //   </div>
    //   <div class="main__header__user">
    //     <div class="main__header__user__info">
    //       <p id="userName"></p>
    //       <p id="email"></p>
    //     </div>
    //     <div class="main__header__user__photo"></div>
    //     <button id="find_user">Find User</button>
    //     <button id="logout">LOGOUT</button>
    //   </div>
    // </div>;

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

    header.classList.add = 'header';
    headerLogo.classList.add = 'main__header__logo';
    headerTitle.innerText = 'TODO LIST';
    headerUser.classList.add = 'main__header__user';
    headerUserInfo.classList.add = 'main__header__user__info';
    headerUserPhoto.classList.add = 'main__header__user__photo';
    headerTitle.append(headerLogo);
    headerUserInfo.append(headerUser);
    headerUserName.append();
  }
}
