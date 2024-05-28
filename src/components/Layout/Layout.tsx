import { FC, ReactNode } from "react";
import { Layout as AntdLayout, Drawer } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { CloseOutlined } from "@ant-design/icons";
import DialogsMenuContainer from "../DialogsMenu/DialogsMenuContainer";

interface LayoutProps {
  children: ReactNode;
  onShowMobileMenu: () => void;
  showMobileMenu: boolean;
}

const Layout: FC<LayoutProps> = ({
  children,
  onShowMobileMenu,
  showMobileMenu,
}) => {
  return (
    <AntdLayout className="layout">
      <Drawer
        rootClassName="layout__mobileMenu"
        onClose={onShowMobileMenu}
        open={showMobileMenu}
        placement="left"
        closeIcon={<CloseOutlined style={{ color: "#1677ff" }} />}
        style={{ background: "#001529" }}
      >
        <DialogsMenuContainer />
      </Drawer>
      <Sider
        className="layout__menu"
        width={350}
        collapsible
        collapsedWidth={0}
      >
        <DialogsMenuContainer />
      </Sider>
      <Content className="layout__content">
        <div className="layout__childrenWrapper">{children}</div>
      </Content>
    </AntdLayout>
  );
};

export default Layout;
