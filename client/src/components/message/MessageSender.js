import CanvasDraw from "react-canvas-draw";
import TimeAgo from "react-timeago";

const MessageSender = ({ message, userPicture }) => {
  const drawing = message.text.includes("brushRadius");

  return (
    <>
      <div className={`mt-3 d-flex align-items-start justify-content-end`}>
        <img
          className="rounded-circle me-4"
          src={userPicture}
          alt="Card"
          style={{ width: 50, height: 50 }}
        />
        {drawing ? (
          <CanvasDraw
            className="overflow-hidden"
            saveData={message.text}
            immediateLoading={true}
            hideGrid={true}
            disabled
            canvasWidth={550}
            canvasHeight={197}
            style={{ position: "relative" }}
          />
        ) : (
          <p className={`col-6 mb-1 rounded text-white bg-secondary`}>
            {message.text}
          </p>
        )}
      </div>
      <div className={"d-flex align-items-start justify-content-end"}>
        <TimeAgo date={message.createdAt} />
      </div>
    </>
  );
};

export default MessageSender;
