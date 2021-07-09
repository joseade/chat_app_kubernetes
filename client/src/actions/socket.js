export const Types = {
  START_SOCKET: "START_SOCKET",
  GET_ONLINE_USERS: "GET_ONLINE_USERS",
};

export const startSocket = (user) => ({
  type: Types.START_SOCKET,
  payload: {
    type: "ADD_USER",
    userId: user.id,
  },
});

export const getOnLineUsers = (users) => ({
  type: Types.GET_ONLINE_USERS,
  payload: users,
});
