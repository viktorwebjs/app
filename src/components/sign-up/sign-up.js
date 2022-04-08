import { ROUTS } from '../../shared/constants/routs';
import {
  creatUserAuthRequest,
  creatUserDataRequest,
  signInRequest,
  getUsers,
  getUser,
} from '../../api/api-handlers';
import { setToken, setUser } from '../../shared/services/local-storage-service';

export const signUpHandler = () => {
  const firstNameInput = document.getElementById('firstNameInput');
  const lastNameInput = document.getElementById('lastNameInput');
  const birthInput = document.getElementById('birthInput');
  const emailInput = document.getElementById('emailInput');
  const passwordInput1 = document.getElementById('passwordInput1');
  const passwordInput2 = document.getElementById('passwordInput2');
  const signUpBtn = document.getElementById('signUpBtn');

  const userData = {
    firstName: '',
    lastName: '',
    birth: '',
    email: '',
    password1: '',
    password2: '',
    // userId: '',
  };

  firstNameInput.oninput = () => {
    userData.firstName = firstNameInput.value;

    checkFormValid();
  };
  lastNameInput.oninput = () => {
    userData.lastName = lastNameInput.value;

    checkFormValid();
  };
  birthInput.oninput = () => {
    userData.birth = birthInput.value;

    checkFormValid();
  };
  emailInput.oninput = () => {
    userData.email = emailInput.value;

    checkFormValid();
  };
  passwordInput1.oninput = () => {
    userData.password1 = passwordInput1.value;

    checkFormValid();
  };
  passwordInput2.oninput = () => {
    userData.password2 = passwordInput2.value;

    checkFormValid();
  };

  signUpBtn.onclick = async () => {
    const { email, password1 } = userData;
    let authId = '';
    let userId = '';

    await creatUserAuthRequest(userData).then((response) => {
      console.log('response :>> ', (authId = response.user.uid));
    });

    await creatUserDataRequest({ ...userData, authId }).then((res) => {
      userId = res.name;
    });

    await signInRequest({ email, password: password1 })
      .then(({ user: { accessToken } }) => {
        console.log('signInRequest', res);
        setToken(accessToken);
      })
      .catch((err) => console.log('Invalid'));

    await getUser(userId).then((res) => {
      // console.log('user', res);
      setUser(res);
      window.location.href = ROUTS.main;
    });
  };

  const checkFormValid = () => {
    const isFormValid = Object.values(userData).every((value) => !!value);
    const isPasswordsEqual = userData.password1 === userData.password2;

    isFormValid && isPasswordsEqual
      ? signUpBtn.removeAttribute('disabled')
      : signUpBtn.setAttribute('disabled', true);
  };
};
