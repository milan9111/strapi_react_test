import { FC, ReactNode } from "react";
import "./layout.scss";
import { setShowMobileMenu } from "../../store/reducers/DialogsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Layout from "./Layout";

interface LayoutContainerProps {
  children: ReactNode;
}

const LayoutContainer: FC<LayoutContainerProps> = ({ children }) => {
  const { showMobileMenu } = useAppSelector((state) => state.dialogs);
  const dispatch = useAppDispatch();

  const onShowMobileMenu = () => {
    dispatch(setShowMobileMenu(false));
  };

  return (
    <Layout onShowMobileMenu={onShowMobileMenu} showMobileMenu={showMobileMenu}>
      {children}
    </Layout>
  );
};

export default LayoutContainer;
