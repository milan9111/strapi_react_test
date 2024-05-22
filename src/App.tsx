import { FC, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Spin, notification } from "antd";
import { checkCurrentApiKey } from "./api";
import "./app.scss";
import AssistantContainer from "./pages/Assistant/AssistantContainer";
import ForbiddenContainer from "./pages/Forbidden/ForbiddenContainer";

const App: FC = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [checkingApiKey, setChekingApiKey] = useState<boolean>(true);

  useEffect(() => {
    const id: string = window.location.pathname.split("/").pop() as string;
    onCheckCurrentApiKey(id);
  }, []);

  const onCheckCurrentApiKey = async (value: string) => {
    setChekingApiKey(true);
    const data = await checkCurrentApiKey(value);

    if (data) {
      const { success, message } = data;

      setIsAuth(success);

      if (success) {
        notification.success({
          message: "Success!",
          description: message,
          duration: 1,
        });
      }
    }

    setChekingApiKey(false);
  };

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
