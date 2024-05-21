import { FC } from "react";
import ChatContainer from "../../components/Chat/ChatContainer";

const Assistant: FC = () => {
  return (
    <section className="assistant">
      <div className="assistant__container">
        <div className="assistant__chat">
          <ChatContainer />
        </div>
      </div>
    </section>
  );
};

export default Assistant;
