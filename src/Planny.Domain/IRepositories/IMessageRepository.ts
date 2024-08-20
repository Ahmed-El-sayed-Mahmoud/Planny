import { TablesInsert,TablesUpdate,Tables } from "../EntitiesTypes/EntityTypes";

import { RepositoryRespone } from "@/src/Planny.Domain/IRepositories/RepositoryRespnse";

export interface IMessageRepository {
  createMessage(message: TablesInsert<'message'>): Promise<RepositoryRespone<Tables<'message'>>>;
  getMessageById(id: number): Promise<RepositoryRespone<Tables<'message'> | null>>;
  updateMessage(id: number, message: TablesUpdate<'message'>): Promise<RepositoryRespone<Tables<'message'> | null>>;
  deleteMessage(id: number): Promise<RepositoryRespone<void>>;
  getMessagesByChatId(chat_id: number): Promise<RepositoryRespone<Tables<'message'>[]>>;
}
