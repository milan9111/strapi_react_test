import { AxiosError } from "axios";
import { notification } from "antd";
import { AppDispatch } from "../store";
import { requestToApi } from "../../helpers/requestToApi";
import { ICheckCurrentApiKey } from "../../types/interfaces/IResponse";
import { setChekingApiKey, setIsAuth } from "../reducers/AuthSlice";

export const checkCurrentApiKey =
  (value: string) =>
  async (dispatch: AppDispatch): Promise<number | undefined> => {
    dispatch(setChekingApiKey(true));
    try {
      const { data, status } = await requestToApi({
        url: `/api/user/api-key/${value}`,
        config: {},
      });

      if (data) {
        const { success, message }: ICheckCurrentApiKey = data;

        dispatch(setIsAuth(success));

        if (success) {
          notification.success({
            message: "Success!",
            description: message,
            duration: 1,
          });
        }
      }

      dispatch(setChekingApiKey(false));

      return status;
    } catch (err) {
      const error = err as AxiosError<Error>;
      notification.error({
        message: "Error",
        description: error?.response?.data?.message || "Somethong went wrong!",
      });
      dispatch(setChekingApiKey(false));

      return undefined;
    }
  };
