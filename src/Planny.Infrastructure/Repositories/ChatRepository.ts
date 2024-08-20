import { db } from "../db/index";
import { TablesInsert,Tables,TablesUpdate } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
import  { IChatRepository } from "@/src/Planny.Domain/IRepositories/IChatRepository";
import { chatTable, messageTable } from "../db/schema";
import { desc, eq } from "drizzle-orm";
import { injectable } from "inversify";
import { RepositoryRespone } from "@/src/Planny.Domain/IRepositories/RepositoryRespnse";
@injectable()
export class ChatRepository implements IChatRepository {
  
  async createChat(chat: TablesInsert<'chat'>): Promise<RepositoryRespone<Tables<'chat'>>> {
    let response: RepositoryRespone<Tables<'chat'>> = {};
    try {
      [response.data] = await db.insert(chatTable).values(chat).returning();
    } catch (error) {
      response.error = "Error Creating new chat";
    }
    return response;
  }

  async getChatById(id: number): Promise<RepositoryRespone<Tables<'chat'> | null>> {
    let response: RepositoryRespone<Tables<'chat'> | null> = {};
    try {
      [response.data] = await db.select().from(chatTable).where(eq(chatTable.id, id));
    } catch (_) {
      response.error = "Error Getting Chat";
    }
    return response;
  }

  async updateChat(id: number, chat: TablesUpdate<'chat'>): Promise<RepositoryRespone<Tables<'chat'> | null>> {
    let response: RepositoryRespone<Tables<'chat'> | null> = {};
    try {
      [response.data] = await db.update(chatTable).set(chat).where(eq(chatTable.id, id)).returning();
    } catch (_) {
      response.error = "Error Updating Chat";
    }
    return response;
  }

  async deleteChat(id: number): Promise<RepositoryRespone<void>> {
    let response: RepositoryRespone<void> = {};
    try {
      await db.delete(chatTable).where(eq(chatTable.id, id));
    } catch (_) {
      response.error = "Error Deleting Chat";
    }
    return response;
  }

  async getChatsByUserEmail(user_email: string): Promise<RepositoryRespone<Tables<'chat'>[]>> {
    let response: RepositoryRespone<Tables<'chat'>[]> = {};
    try {
      response.data = (await db
        .select()
        .from(chatTable)
        .where(eq(chatTable.user_email, user_email))
        .orderBy(desc(chatTable.id)));
    } catch (_) {
      response.error = "Error Getting Chats by User Email";
    }
    return response;
  }
}