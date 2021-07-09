import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CanvasDraw from "react-canvas-draw";
import { useTranslation } from "react-i18next";

import MessageSender from "../message/MessageSender";
import MessageReceiver from "../message/MessageReceiver";
import * as actionsChat from "../../actions/chat";

const ChatSection = () => {
  const { chat, user } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const scrollRef = useRef();
  const sendCanvas = useRef();

  const { conversation, messages } = chat;
  const { friends } = user;
  const [newMessage, setNewMessage] = useState("");
  const [showCanvas, setShowCanvas] = useState(false);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = () => {
    let sendText;
    if (showCanvas) {
      const data = sendCanvas.current.getSaveData();
      if (!data.includes("brushRadius")) {
        setShowCanvas((p) => !p);
        return;
      }
      sendText = data;
    } else {
      sendText = newMessage;
    }

    console.log(conversation.members);

    dispatch(
      actionsChat.createMessage(
        conversation._id,
        user.id,
        sendText,
        conversation.members
      )
    );
    setShowCanvas(false);
    setNewMessage("");
  };

  return (
    <div className="h-100 col-6 d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
      {conversation ? (
        <>
          <div className="h-75 overflow-auto">
            {messages.map((message) => (
              <div ref={scrollRef}>
                {message.sender === user.id ? (
                  <MessageSender
                    message={message}
                    name={user.name}
                    userPicture={user.profilePicture}
                  />
                ) : (
                  <MessageReceiver
                    message={message}
                    receiverPicture={
                      friends.filter(
                        (friend) => friend.id === message.sender
                      )[0].profilePicture
                    }
                    receiverName={
                      friends.filter(
                        (friend) => friend.id === message.sender
                      )[0].name
                    }
                  />
                )}
              </div>
            ))}
          </div>
          <div className="h-25 d-flex align-items-center justify-content-between">
            {showCanvas ? (
              <CanvasDraw
                ref={sendCanvas}
                className="border border-dark"
                canvasWidth={550}
                canvasHeight={170}
              />
            ) : (
              <textarea
                className="col-9 align-self-stretch chatBoxBottom"
                placeholder="Leave a comment here..."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
            )}

            <div className="col-2 h-100 d-flex flex-column justify-content-evenly">
              <button
                type="button"
                onClick={handleSubmit}
                className="h-50 btn btn-success"
              >
                Send
              </button>
              <button
                className="h-25 btn btn-success"
                onClick={() => setShowCanvas((p) => !p)}
              >
                {showCanvas ? "Cancel" : "Draw"}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="text-center mt-5 fs-1">
          <span>{t("chat.start")}</span>
        </div>
      )}
    </div>
  );
};

export default ChatSection;
