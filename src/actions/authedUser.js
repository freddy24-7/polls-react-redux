export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const LOGOUT = 'LOGOUT';

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
