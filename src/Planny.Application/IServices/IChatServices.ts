
import { Tables, TablesInsert } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
import { ServiceResponse } from "../ServiceResponse";

export interface IChatServices {
  createChat(chat: string): Promise<ServiceResponse<Tables<'chat'>>>;
  
  getChatById(id: number): Promise<ServiceResponse<Tables<'chat'>>>;
  
  deleteChat(id: number): Promise<ServiceResponse<void>>;
  
  getChatsByUserEmail(): Promise<ServiceResponse<Tables<'chat'>[]>>;
}
