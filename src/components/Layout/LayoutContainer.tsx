import { FC, ReactNode } from "react";
import "./layout.scss";
import Layout from "./Layout";

interface LayoutContainerProps {
  children: ReactNode;
}

const LayoutContainer: FC<LayoutContainerProps> = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default LayoutContainer;
