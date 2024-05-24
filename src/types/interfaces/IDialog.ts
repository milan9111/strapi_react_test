import { IChatMessage } from "./IChatMessage";

export interface IDialog {
    id: number;
    content: IChatMessage[];
    createdAt: string;
    updatedAt: string;
}