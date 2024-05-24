import { FC, useRef, useEffect } from "react";
import "./chat.scss";
import { EAuthorType } from "../../types/enums/EAuthorType";
import { sendCurrentMessage } from "../../store/actions/dialogsActions";
import {
  addMessageToField,
  setCurrentMessage,
  setSendingMessage,
} from "../../store/reducers/DialogsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Chat from "./Chat";

const ChatContainer: FC = () => {
  const { currentMessage, allMessages, sendingMessage } = useAppSelector(
    (state) => state.dialogs
  );
  const dispatch = useAppDispatch();
  const fieldEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  const onCurrentMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setCurrentMessage(e.target.value));
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !sendingMessage) {
      e.preventDefault();
      onSendCurrentMessage();
    }
  };

  const onAddMessageToField = (author: EAuthorType, message: string) => {
    dispatch(
      addMessageToField({
        id: new Date().getTime(),
        author: author,
        text: message,
      })
    );
  };

  const onSendCurrentMessage = async () => {
    if (currentMessage.trim().length && !sendingMessage) {
      dispatch(setSendingMessage(true));
      onAddMessageToField(EAuthorType.You, currentMessage);
      dispatch(setCurrentMessage(""));
      const data = await dispatch(sendCurrentMessage(currentMessage));

      if (data) {
        const { message: assistantMessage } = data;
        onAddMessageToField(EAuthorType.Assistant, assistantMessage);
      }

      dispatch(setSendingMessage(false));
    }
  };

  const scrollToBottom = () => {
    fieldEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const showAllMessages = allMessages.map((item) => {
    return (
      <div
        key={item.id}
        className="chat__field_message"
        style={
          item.author === EAuthorType.You ? { justifyContent: "flex-end" } : {}
        }
      >
        <div
          className={
            item.author === EAuthorType.You
              ? "chat__field_yourMessage"
              : "chat__field_assistantMessage"
          }
        >
          {item.text}
        </div>
      </div>
    );
  });

  return (
    <Chat
      onCurrentMessage={onCurrentMessage}
      onPressEnter={onPressEnter}
      currentMessage={currentMessage}
      onSendCurrentMessage={onSendCurrentMessage}
      sendingMessage={sendingMessage}
      showAllMessages={showAllMessages}
      fieldEndRef={fieldEndRef}
    />
  );
};
export default ChatContainer;
