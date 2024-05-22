import axios, { AxiosError } from "axios";
import { notification } from "antd";
import {
  IAssistantMessageResponse,
  ICheckCurrentApiKey,
} from "../types/interfaces/IResponse";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const checkCurrentApiKey = async (
  value: string
): Promise<ICheckCurrentApiKey | undefined> => {
  try {
    const { data }: { data: ICheckCurrentApiKey } = await instance.get(
      `/api/user/api-key/${value}`
    );
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

export const sendCurrentMessage = async (
  message: string
): Promise<IAssistantMessageResponse | undefined> => {
  try {
    const payload = { message };
    const { data }: { data: IAssistantMessageResponse } = await instance.post(
      "/api/user/assistant/message",
      { ...payload }
    );
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
