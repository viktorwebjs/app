export const setToken = (token) => localStorage.setItem('accessToken', token);

export const getToken = () => localStorage.getItem('accessToken');

export const setUser = (user) =>
  localStorage.setItem('user', JSON.stringify(user));

export const getUser = () => JSON.parse(localStorage.getItem('user')) || {};

export const clearUser = () => localStorage.removeItem('user');

export const clearToken = () => localStorage.removeItem('accessToken');

export const setCurrentUserData = (data) =>
  localStorage.setItem('currentUserData', JSON.stringify(data));

export const getCurrentUserData = () =>
  JSON.parse(localStorage.getItem('currentUserData'));
