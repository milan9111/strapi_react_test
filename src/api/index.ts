import axios, { AxiosError } from "axios";
import { notification } from "antd";
import { ICheckCurrentApiKey } from "../types/interfaces/IResponse";

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

export const sendCurrentMessage = async (message: string) => {
    // try {
    //     const result = await axios.post('https://api.openai.com/v1/chat/completions', {
    //         model: "gpt-3.5-turbo-0613",
    //         messages: [{"role": "user", "content": message}],
    //       }, {
    //         headers: {
    //           'Authorization': `Bearer ${import.meta.env.VITE_GPT_KEY}`,
    //           'Content-Type': 'application/json',
    //         },
    //       });
    //       console.log(result.data.choices[0].message.content);
    // } catch(error) {
    //     console.error('Error fetching data:', error);
    // }
}
