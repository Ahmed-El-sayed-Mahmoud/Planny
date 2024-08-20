import { db } from "../db/index"; 
import { TablesInsert,Tables,TablesUpdate } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes"; 
import { IMessageRepository } from "@/src/Planny.Domain/IRepositories/IMessageRepository"; 
import { messageTable } from "../db/schema"; 
import { eq } from "drizzle-orm"; 
import { injectable } from "inversify";
import { RepositoryRespone } from "@/src/Planny.Domain/IRepositories/RepositoryRespnse";

@injectable()
export class MessageRepository implements IMessageRepository {

  async createMessage(message: TablesInsert<'message'>): Promise<RepositoryRespone<Tables<'message'>>> {
    let response: RepositoryRespone<Tables<'message'>> = {};
    try {
      const [result] = await db.insert(messageTable).values(message).returning();
      response.data = result as Tables<'message'>;
    } catch (error) {
      response.error = "Error Creating new message";
    }
    return response;
  }

  async getMessageById(id: number): Promise<RepositoryRespone<Tables<'message'> | null>> {
    let response: RepositoryRespone<Tables<'message'> | null> = {};
    try {
      const [result] = await db.select().from(messageTable).where(eq(messageTable.id, id));
      response.data = result as Tables<'message'> | null;
    } catch (_) {
      response.error = "Error Getting Message";
    }
    return response;
  }

  async updateMessage(id: number, message: TablesUpdate<'message'>): Promise<RepositoryRespone<Tables<'message'> | null>> {
    let response: RepositoryRespone<Tables<'message'> | null> = {};
    try {
      const [result] = await db.update(messageTable).set(message).where(eq(messageTable.id, id)).returning();
      response.data = result as Tables<'message'> | null;
    } catch (_) {
      response.error = "Error Updating Message";
    }
    return response;
  }

  async deleteMessage(id: number): Promise<RepositoryRespone<void>> {
    let response: RepositoryRespone<void> = {};
    try {
      await db.delete(messageTable).where(eq(messageTable.id, id));
    } catch (_) {
      response.error = "Error Deleting Message";
    }
    return response;
  }

  async getMessagesByChatId(chat_id: number): Promise<RepositoryRespone<Tables<'message'>[]>> {
    let response: RepositoryRespone<Tables<'message'>[]> = {};
    try {
      const results = await db.select().from(messageTable).where(eq(messageTable.chat_id, chat_id));
      response.data = results as Tables<'message'>[];
    } catch (_) {
      response.error = "Error Getting Messages by Chat ID";
    }
    return response;
  }
}