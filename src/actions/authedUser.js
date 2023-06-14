export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOGOUT = 'LOGOUT';
export const LOAD_DATA = 'LOAD_DATA';

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT,
  };
}
