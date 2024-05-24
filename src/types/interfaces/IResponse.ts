import { IDialog } from "./IDialog";

export interface ICheckCurrentApiKey {
    success: boolean;
    message: string;
    user_id: number;
    dialogs: IDialog[];
}

export interface IAssistantMessageResponse {
    success: boolean;
    message: string;
}