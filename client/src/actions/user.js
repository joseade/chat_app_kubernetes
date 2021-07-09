export const Types = {
  REGISTER_USER_REQUEST: "REGISTER_USER_REQUEST",
  REGISTER_USER_SUCCES: "REGISTER_USER_SUCCES",
  REGISTER_USER_ERROR: "REGISTER_USER_ERROR",
  LOGIN_USER_REQUEST: "LOGIN_USER_REQUEST",
  LOGIN_USER_SUCCES: "LOGIN_USER_SUCCES",
  LOGIN_USER_ERROR: "LOGIN_USER_ERROR",
  SEARCH_USER_REQUEST: "SEARCH_USER_REQUEST",
  SEARCH_USER_SUCCES: "SEARCH_USER_SUCCES",
  SEARCH_USER_ERROR: "SEARCH_USER_ERROR",
  FOLLOW_USER_REQUEST: "FOLLOW_USER_REQUEST",
  FOLLOW_USER_SUCCES: "FOLLOW_USER_SUCCES",
  FOLLOW_USER_ERROR: "FOLLOW_USER_ERROR",
  SEND_FOLLOWER: "SEND_FOLLOWER",
  RECEIVE_FOLLOWER: "RECEIVE_FOLLOWER",
  UPDATE_AVATAR_REQUEST: "UPDATE_AVATAR_REQUEST",
  UPDATE_AVATAR_SUCCES: "UPDATE_AVATAR_SUCCES",
  UPDATE_LANGUAGE_REQUEST: "UPDATE_LANGUAGE_REQUEST",
  UPDATE_LANGUAGE_SUCCES: "UPDATE_LANGUAGE_SUCCES",
};

export const updateLanguage = (language) => ({
  type: Types.UPDATE_LANGUAGE_REQUEST,
  payload: language,
  meta: {
    method: "POST",
    url: "/users/language",
    succes: Types.UPDATE_LANGUAGE_SUCCES,
  },
});

export const updateAvatar = (profilePicture) => ({
  type: Types.UPDATE_AVATAR_REQUEST,
  payload: profilePicture,
  meta: {
    method: "POST",
    url: "/users/picture",
    succes: Types.UPDATE_AVATAR_SUCCES,
  },
});

export const registerRequest = (user) => ({
  type: Types.REGISTER_USER_REQUEST,
  payload: user,
  meta: {
    method: "POST",
    url: "/users/signup",
    succes: Types.REGISTER_USER_SUCCES,
    error: Types.REGISTER_USER_ERROR,
  },
});

export const loginRequest = (user) => ({
  type: Types.LOGIN_USER_REQUEST,
  payload: user,
  meta: {
    method: "POST",
    url: "/users/signin",
    succes: Types.LOGIN_USER_SUCCES,
    error: Types.LOGIN_USER_ERROR,
  },
});

export const searchUserRequest = (user) => ({
  type: Types.SEARCH_USER_REQUEST,
  payload: user,
  meta: {
    method: "GET",
    url: `/users/${user}`,
    succes: Types.SEARCH_USER_SUCCES,
    error: Types.SEARCH_USER_ERROR,
  },
});

export const followUserRequest = (user, friend) => ({
  type: Types.FOLLOW_USER_REQUEST,
  payload: friend,
  meta: {
    method: "POST",
    url: `/users/${user.id}/follow`,
    succes: Types.FOLLOW_USER_SUCCES,
    error: Types.FOLLOW_USER_ERROR,
  },
});

export const sendFollower = (sender, receiver) => ({
  type: "mess",
  payload: {
    type: Types.SEND_FOLLOWER,
    sender,
    receiver,
  },
});

export const receiveFollower = (user) => ({
  type: Types.RECEIVE_FOLLOWER,
  payload: user,
});
