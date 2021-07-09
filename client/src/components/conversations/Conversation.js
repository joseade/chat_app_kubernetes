import { useDispatch, useSelector } from "react-redux";
import * as actionsChat from "../../actions/chat";
import * as actionsConversations from "../../actions/conversations";

import MultipleConversations from "./MultipleConversations";
import MultipleConversationsRemove from "./MultipleConversationsRemove";

const Conversation = ({ members, conversation }) => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { friends } = user;
  const receiver = friends.filter(
    (friend) => members.includes(friend.id) && friend.id !== user.id
  );
  const admin = members[0];
  const isAdmin = admin === user.id;

  const picture =
    conversation.members.length > 2
      ? "/person/group-icon.png"
      : receiver[0].profilePicture;

  const quitConversation = () => {
    dispatch(
      actionsConversations.userQuitsConversation(conversation._id, user.id)
    );
  };

  return (
    <div className="mb-3">
      <div
        role="button"
        className="list-group-item list-group-item-action d-flex align-items-center justify-content-start"
        onClick={() => {
          dispatch(actionsChat.getConversation(conversation));
          dispatch(actionsChat.messagesRequest(conversation));
        }}
      >
        <img
          className="rounded-circle me-4"
          src={picture}
          alt="Card"
          style={{ width: 50, height: 50 }}
        />
        <strong className="mb-1">{receiver[0].name}</strong>
      </div>
      {isAdmin && (
        <div className="d-flex justify-content-end">
          <MultipleConversations
            members={members}
            conversation={conversation}
          />
          {conversation.members.length > 2 && (
            <MultipleConversationsRemove
              members={members}
              conversation={conversation}
            />
          )}
        </div>
      )}
      {!isAdmin && (
        <div className="d-flex justify-content-end">
          {conversation.members.length > 2 && (
            <button
              onClick={quitConversation}
              type="button"
              className="btn btn-danger"
            >
              <i className="bi bi-person-dash-fill"></i>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Conversation;
