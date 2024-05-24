import { FC, useRef, useEffect, useState } from "react";
import "./chat.scss";
import { EAuthorType } from "../../types/enums/EAuthorType";
import {
  createNewDialog,
  sendCurrentMessage,
  updateSelectedDialog,
} from "../../store/actions/dialogsActions";
import {
  setCurrentMessage,
  setSendingMessage,
} from "../../store/reducers/DialogsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Chat from "./Chat";
import { ECreateNewDialog } from "../../types/enums/ECreateNewDialog";

const ChatContainer: FC = () => {
  const { userID } = useAppSelector((state) => state.auth);
  const { currentMessage, selectedDialog, sendingMessage } = useAppSelector(
    (state) => state.dialogs
  );
  const dispatch = useAppDispatch();
  const fieldEndRef = useRef<HTMLDivElement | null>(null);
  const [pendingMessage, setPendingMessage] = useState<{
    author: EAuthorType;
    message: string;
  } | null>(null);

  useEffect(() => {
    scrollToBottom();
  }, [selectedDialog]);

  useEffect(() => {
    if (pendingMessage && selectedDialog) {
      const { id } = selectedDialog;
      const { author, message } = pendingMessage;
      dispatch(
        updateSelectedDialog(id, {
          author: author,
          message: message,
          date: String(new Date().getTime()),
        })
      );
      setPendingMessage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDialog, pendingMessage]);

  const onCurrentMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setCurrentMessage(e.target.value));
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !sendingMessage) {
      e.preventDefault();
      onSendCurrentMessage();
    }
  };

  const onAddMessageToField = async (
    author: EAuthorType,
    message: string,
    flag: ECreateNewDialog
  ) => {
    if (selectedDialog) {
      dispatch(
        updateSelectedDialog(selectedDialog.id, {
          author: author,
          message: message,
          date: String(new Date().getTime()),
        })
      );
    } else {
      let status;

      if (flag === ECreateNewDialog.Allow) {
        status = await dispatch(createNewDialog(userID));
      }

      if (status === 200 || flag === ECreateNewDialog.NotAllow) {
        setPendingMessage({ author, message });
      }
    }
  };

  const onSendCurrentMessage = async () => {
    if (currentMessage.trim().length && !sendingMessage) {
      dispatch(setSendingMessage(true));
      onAddMessageToField(
        EAuthorType.You,
        currentMessage,
        ECreateNewDialog.Allow
      );
      dispatch(setCurrentMessage(""));
      const data = await dispatch(sendCurrentMessage(currentMessage));

      if (data) {
        const { message: assistantMessage } = data;
        onAddMessageToField(
          EAuthorType.Assistant,
          assistantMessage,
          ECreateNewDialog.NotAllow
        );
      }

      dispatch(setSendingMessage(false));
    }
  };

  const scrollToBottom = () => {
    fieldEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const showAllMessages = selectedDialog
    ? selectedDialog?.content.map((item) => {
        return (
          <div
            key={item.id}
            className="chat__field_message"
            style={
              item.author === EAuthorType.You
                ? { justifyContent: "flex-end" }
                : {}
            }
          >
            <div
              className={
                item.author === EAuthorType.You
                  ? "chat__field_yourMessage"
                  : "chat__field_assistantMessage"
              }
            >
              {item.message}
            </div>
          </div>
        );
      })
    : [];

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
