
import { AxiosError } from "axios";
import { notification } from "antd";
import { requestToApi } from "../../helpers/requestToApi";
import { IAssistantMessageResponse } from "../../types/interfaces/IResponse";

export const sendCurrentMessage =
  (message: string) =>
  async (): Promise<IAssistantMessageResponse | undefined> => {
    const payload = { message };
    try {
      const { data }: {data: IAssistantMessageResponse} = await requestToApi({
        url: "/api/user/assistant/message",
        method: "POST",
        data: payload,
        config: {},
      });

      return data;
    } catch (err) {
      const error = err as AxiosError<Error>;
      notification.error({
        message: "Error",
        description: error?.response?.data?.message || "Somethong went wrong!",
      });
    
      return undefined;
    }
  };
