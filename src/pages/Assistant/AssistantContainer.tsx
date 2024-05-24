import { FC } from "react";
import "./assistant.scss";
import Assistant from "./Assistant";
import LayoutContainer from "../../components/Layout/LayoutContainer";

const AssistantContainer: FC = () => {
  return (
    <LayoutContainer>
      <Assistant />
    </LayoutContainer>
  );
};

export default AssistantContainer;
