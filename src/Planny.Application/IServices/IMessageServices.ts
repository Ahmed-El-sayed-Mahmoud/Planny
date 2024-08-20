
import { Tables, TablesInsert, TablesUpdate } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
import { ServiceResponse } from "../ServiceResponse";
export interface IMessageServices {
    createMessage(message: TablesInsert<'message'>): Promise<ServiceResponse<Tables<'message'>>>;
    
    getMessageById(id: number): Promise<ServiceResponse<Tables<'message'>>>;
    
    updateMessage(id: number, message: TablesUpdate<'message'>): Promise<ServiceResponse<Tables<'message'>>>;
    
    deleteMessage(id: number): Promise<ServiceResponse<void>>;
    
    getMessagesByChatId(chatId: number): Promise<ServiceResponse<Tables<'message'>[]>>;
  }
