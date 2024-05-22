import { FC, useState, useRef, useEffect } from "react";
import "./chat.scss";
import { sendCurrentMessage } from "../../api";
import { IChatMessage } from "../../types/interfaces/IChatMessage";
import Chat from "./Chat";
import { EAuthorType } from "../../types/enums/EAuthorType";

const ChatContainer: FC = () => {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [allMessages, setAllMessages] = useState<IChatMessage[]>([]);
  const [sendingMessage, setSendingMessage] = useState<boolean>(false);
  const fieldEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  const onCurrentMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentMessage(e.target.value);
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !sendingMessage) {
      e.preventDefault();
      onSendCurrentMessage();
    }
  };

  const addMessageToField = (author: EAuthorType, message: string) => {
    setAllMessages((prev) => [
      ...prev,
      {
        id: new Date().getTime(),
        author: author,
        text: message,
      },
    ]);
  };

  const onSendCurrentMessage = async () => {
    if (currentMessage.trim().length && !sendingMessage) {
      setSendingMessage(true);
      addMessageToField(EAuthorType.You, currentMessage);
      setCurrentMessage("");
      const assistantMessage = await sendCurrentMessage(currentMessage);
      addMessageToField(EAuthorType.Assistant, assistantMessage);
      setSendingMessage(false);
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
