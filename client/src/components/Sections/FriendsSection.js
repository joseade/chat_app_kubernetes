import { useDispatch, useSelector } from "react-redux";
import * as actionsConversations from "../../actions/conversations";

const FriendsSection = () => {
  const dispatch = useDispatch();
  const { user, socket, userConversations } = useSelector((state) => state);
  const { friends } = user;
  const { onlineUsers } = socket;
  const onlineFriends = friends.filter((friend) =>
    onlineUsers.some((onlineUser) => friend.id === onlineUser.userId)
  );
  const offlineFriends = friends.filter(
    (friend) =>
      !onlineUsers.some((onlineUser) => friend.id === onlineUser.userId)
  );

  return (
    <div className="h-100 col-3 d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
      {onlineFriends.length > 0 &&
        onlineFriends.map((onlineFriend) => (
          <div
            key={onlineFriend.id}
            role="button"
            className="list-group-item list-group-item-action d-flex align-items-center justify-content-start"
            onClick={() => {
              const previousConversations =
                userConversations.conversations.filter((conversation) => {
                  if (conversation.members.length < 3) {
                    return conversation.members.includes(onlineFriend.id);
                  }
                });
              console.log(previousConversations.length);
              if (previousConversations.length > 0) {
                return;
              }
              const senderId = user.id;
              const receiverId = [onlineFriend.id];
              dispatch(
                actionsConversations.createConversation(senderId, receiverId)
              );
            }}
          >
            <div className="position-relative">
              <div
                className="position-absolute rounded-circle"
                style={{
                  width: 15,
                  height: 15,
                  top: -25,
                  left: 40,
                  backgroundColor: "limegreen",
                }}
              ></div>
            </div>
            <img
              className="rounded-circle me-4"
              src={onlineFriend.profilePicture}
              alt="Card"
              style={{ width: 50, height: 50 }}
            />
            <strong className="mb-1">{onlineFriend.name}</strong>
          </div>
        ))}
      {offlineFriends.length > 0 &&
        offlineFriends.map((offlineFriend) => (
          <div
            key={offlineFriend.id}
            role="button"
            className="list-group-item list-group-item-action d-flex align-items-center justify-content-start"
          >
            <img
              className="rounded-circle me-4"
              src={offlineFriend.profilePicture}
              alt="Card"
              style={{ width: 50, height: 50 }}
            />
            <strong className="mb-1">{offlineFriend.name}</strong>
          </div>
        ))}
    </div>
  );
};

export default FriendsSection;
