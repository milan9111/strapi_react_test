import { AxiosError } from "axios";
import { notification } from "antd";
import { AppDispatch } from "../store";
import { requestToApi } from "../../helpers/requestToApi";
import { IAssistantMessageResponse } from "../../types/interfaces/IResponse";
import { IChatMessage } from "../../types/interfaces/IChatMessage";
import { IDialog } from "../../types/interfaces/IDialog";
import {
  addNewDialog,
  updateSelectedDialogContent,
} from "../reducers/DialogsSlice";

export const sendCurrentMessage =
  (message: string) =>
  async (): Promise<IAssistantMessageResponse | undefined> => {
    const payload = { message };
    try {
      const { data }: { data: IAssistantMessageResponse } = await requestToApi({
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

export const updateSelectedDialog =
  (id: number, data: IChatMessage) =>
  async (dispatch: AppDispatch): Promise<number | undefined> => {
    const payload = { data };
    try {
      const { data, status } = await requestToApi({
        url: `/api/dialogs/${id}`,
        method: "PUT",
        data: payload,
        config: {},
      });
      dispatch(updateSelectedDialogContent(data));
      return status;
    } catch (err) {
      const error = err as AxiosError<Error>;
      notification.error({
        message: "Error",
        description: error?.response?.data?.message || "Somethong went wrong!",
      });

      return undefined;
    }
  };

export const createNewDialog =
  (id: number) =>
  async (dispatch: AppDispatch): Promise<number | undefined> => {
    const payload = { data: { user: { id } } };
    try {
      const { data, status } = await requestToApi({
        url: "/api/dialogs?populate=*",
        method: "POST",
        data: payload,
        config: {},
      });
      const newDialog: IDialog = {
        content: data.data.attributes.content,
        createdAt: data.data.attributes.createdAt,
        updatedAt: data.data.attributes.updatedAt,
        id: data.data.id,
      };
      dispatch(addNewDialog(newDialog));
      return status;
    } catch (err) {
      const error = err as AxiosError<Error>;
      notification.error({
        message: "Error",
        description: error?.response?.data?.message || "Somethong went wrong!",
      });

      return undefined;
    }
  };

export const deleteDialog =
  (id: number) => async (): Promise<number | undefined> => {
    try {
      const { status } = await requestToApi({
        url: `/api/dialogs/${id}`,
        method: "DELETE",
        config: {},
      });

      return status;
    } catch (err) {
      const error = err as AxiosError<Error>;
      notification.error({
        message: "Error",
        description: error?.response?.data?.message || "Somethong went wrong!",
      });

      return undefined;
    }
  };
