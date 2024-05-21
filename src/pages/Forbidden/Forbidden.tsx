import { FC } from "react";
import { Result } from "antd";

const Forbidden: FC = () => {
  return (
    <section className="forbidden">
      <div className="forbidden__container">
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
        />
      </div>
    </section>
  );
};

export default Forbidden;
