import CanvasDraw from "react-canvas-draw";
import TimeAgo from "react-timeago";

const MessageReceiver = ({ message, receiverName, receiverPicture }) => {
  const drawing = message.text.includes("brushRadius");

  return (
    <>
      <div className={`mt-3 d-flex align-items-start justify-content-start`}>
        <img
          className="rounded-circle me-4"
          src={receiverPicture}
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
          <p className={`col-6 mb-1 rounded text-white bg-primary`}>
            {message.text}
          </p>
        )}
      </div>
      <div>
        <TimeAgo date={message.createdAt} />
      </div>
    </>
  );
};

export default MessageReceiver;
