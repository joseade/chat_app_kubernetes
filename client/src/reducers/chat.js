import { Types } from "../actions/chat";

const initialState = {
  conversation: null,
  messages: [],
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_CONVERSATION:
      return { ...state, conversation: action.payload };
    case Types.MESSAGES_SUCCES:
      return { ...state, messages: action.payload };

    case Types.CREATE_MESSAGE_SUCCES:
      return {
        ...state,
        messages: state.messages.concat(action.payload),
      };
    case Types.RECEIVE_MESSAGE: {
      console.log(action.payload.conversationId);
      console.log(state.conversation?._id);
      if (action.payload.conversationId === state.conversation?._id) {
        return {
          ...state,
          messages: state.messages.concat(action.payload),
        };
      }
      return state;
    }
    default:
      return state;
  }
};

export default chatReducer;
