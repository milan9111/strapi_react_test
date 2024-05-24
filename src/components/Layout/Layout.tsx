import { FC, ReactNode } from "react";
import { Layout as AntdLayout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import DialogsMenuContainer from "../DialogsMenu/DialogsMenuContainer";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <AntdLayout className="layout">
      <Sider width={350} collapsible>
        <DialogsMenuContainer />
      </Sider>
      <Content className="layout__content">
        <div className="layout__childrenWrapper">{children}</div>
      </Content>
    </AntdLayout>
  );
};

export default Layout;
