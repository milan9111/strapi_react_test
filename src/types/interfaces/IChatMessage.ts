import { EAuthorType } from "../enums/EAuthorType";

export interface IChatMessage {
  id: number;
  author: EAuthorType;
  text: string;
}
