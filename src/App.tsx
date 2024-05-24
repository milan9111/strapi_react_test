import { FC, useEffect } from "react";
import "./app.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { checkCurrentApiKey } from "./store/actions/authActions";
import AssistantContainer from "./pages/Assistant/AssistantContainer";
import ForbiddenContainer from "./pages/Forbidden/ForbiddenContainer";

const App: FC = () => {
  const { isAuth, checkingApiKey } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const id: string = window.location.pathname.split("/").pop() as string;
    dispatch(checkCurrentApiKey(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checkingApiKey) {
    return (
      <section className="checkingApiKey">
        <div className="checkingApiKey__container">
          <Spin />
          <p>Please wait, verifying API key...</p>
        </div>
      </section>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/virtual-assistant/:id"
          element={isAuth ? <AssistantContainer /> : <ForbiddenContainer />}
        />
        <Route path="*" element={<ForbiddenContainer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
