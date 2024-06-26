import { FC } from "react";
import { Button, Input, Empty } from "antd";
import { ArrowUpOutlined, BarsOutlined } from "@ant-design/icons";

interface ChatProps {
  onShowMobileMenu: () => void;
  onCurrentMessage: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPressEnter: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  currentMessage: string;
  onSendCurrentMessage: () => void;
  sendingMessage: boolean;
  showAllMessages: JSX.Element[];
  fieldEndRef: React.MutableRefObject<HTMLDivElement | null>;
}

const Chat: FC<ChatProps> = ({
  onShowMobileMenu,
  onCurrentMessage,
  onPressEnter,
  currentMessage,
  onSendCurrentMessage,
  sendingMessage,
  showAllMessages,
  fieldEndRef,
}) => {
  const { TextArea } = Input;
  return (
    <div className="chat">
      <div className="chat__container">
        <div className="chat__title">
          <Button
            className="chat__title_button"
            type="primary"
            onClick={onShowMobileMenu}
          >
            <BarsOutlined />
          </Button>
          <p className="chat__title_text">Your virtual assistant</p>
          <div></div>
        </div>
        <div
          className="chat__field"
          style={!showAllMessages.length ? { justifyContent: "center" } : {}}
        >
          {showAllMessages.length ? (
            showAllMessages
          ) : (
            <Empty description="There aren't messages" />
          )}
          <div ref={fieldEndRef} />
        </div>
        <div className="chat__inputBox">
          <div className="chat__inputBox_container">
            <TextArea
              className="chat__inputBox_textarea"
              onChange={(e) => onCurrentMessage(e)}
              onKeyDown={(e) => onPressEnter(e)}
              value={currentMessage}
              placeholder="Message assistant"
              allowClear
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
    </div>
  );
};
export default Chat;
