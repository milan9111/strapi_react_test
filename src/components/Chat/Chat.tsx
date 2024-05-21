import { FC } from "react";
import { Button, Input } from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";

interface ChatProps {
  onCurrentMessage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPressEnter: (e: string) => void;
  currentMessage: string;
  onSendCurrentMessage: () => void;
  sendingMessage: boolean;
  showAllMessages: JSX.Element[];
  fieldEndRef: React.MutableRefObject<HTMLDivElement | null>;
}

const Chat: FC<ChatProps> = ({
  onCurrentMessage,
  onPressEnter,
  currentMessage,
  onSendCurrentMessage,
  sendingMessage,
  showAllMessages,
  fieldEndRef,
}) => {
  return (
    <div className="chat">
      <div className="chat__container">
        <div className="chat__field">
          {showAllMessages}
          <div ref={fieldEndRef} />
        </div>
        <div className="chat__inputBox">
          <Input
            onChange={(e) => onCurrentMessage(e)}
            onKeyDown={(e) => onPressEnter(e.key)}
            value={currentMessage}
            placeholder="Message assistant"
          />
          <Button
            type="primary"
            onClick={() => onSendCurrentMessage()}
            loading={sendingMessage}
          >
            <ArrowUpOutlined />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Chat;
