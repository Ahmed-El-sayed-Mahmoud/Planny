import { TablesInsert,TablesUpdate,Tables } from "../EntitiesTypes/EntityTypes";
import { RepositoryRespone } from "./RepositoryRespnse";
export interface IChatRepository {
  createChat(chat: TablesInsert<'chat'>): Promise<RepositoryRespone<Tables<'chat'>>>;
  getChatById(id: number): Promise<RepositoryRespone<Tables<'chat'> | null>>;
  updateChat(id: number, chat: TablesUpdate<'chat'>): Promise<RepositoryRespone<Tables<'chat'> | null>>;
  deleteChat(id: number): Promise<RepositoryRespone<void>>;
  getChatsByUserEmail(user_email: string): Promise<RepositoryRespone<Tables<'chat'>[]>>;
}
