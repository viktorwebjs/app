import { REGEX } from './regex';

const errorsMessages = new Map([
  ['email', 'Invalid email template. Please, correct it'],
  ['required', 'This field is required'],
  ['password', 'Both passwords must be the same'],
]);

const showErrorTag = (id, message) => {
  const error_tag = document.getElementById(id);

  error_tag.style.display = 'block';
  error_tag.innerText = message;
};

const hideErrorTag = (id) => {
  const error_tag = document.getElementById(id);

  error_tag.style.display = 'none';
};

const errorsTagsHandler = new Map([
  ['email_show', (id) => showErrorTag(id, errorsMessages.get('email'))],
  ['email_hide', (id) => hideErrorTag(id)],
  ['required_show', (id) => showErrorTag(id, errorsMessages.get('required'))],
  ['required_hide', (id) => hideErrorTag(id)],
  ['password_show', (id) => showErrorTag(id, errorsMessages.get('password'))],
  ['password_hide', (id) => hideErrorTag(id)],
]);

export const errorTagsIds = new Map([
  ['email', 'emailInputError'],
  ['required_email', 'requiredEmailInputError'],
  ['first_name', 'firstNameInputError'],
  ['last_name', 'lastNameInputError'],
  ['birth', 'birthInputError'],
  ['pass1', 'passInputError1'],
  ['pass2', 'passInputError2'],
]);

export const emailValidator = (email) => REGEX.email.test(email);

export const showErrorMessage = (error_type, id) => {
  errorsTagsHandler.get(error_type)(id);
};

export const hideErrorMessage = (error_type, id) => {
  errorsTagsHandler.get(error_type)(id);
};
