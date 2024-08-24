import { db } from "../db/index";
import { TablesInsert, Tables, TablesUpdate } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
import { IMessageRepository } from "@/src/Planny.Domain/IRepositories/IMessageRepository";
import { chatTable, messageTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { injectable } from "inversify";
import { RepositoryRespone } from "@/src/Planny.Domain/IRepositories/RepositoryRespnse";
import { StatusCodes } from "@/src/Constants/ErrorStatusCodes";

@injectable()
export class MessageRepository implements IMessageRepository {

  async createMessage(message: TablesInsert<'message'>): Promise<RepositoryRespone<Tables<'message'>>> {
    let response: RepositoryRespone<Tables<'message'>> = {};
    try {
      const [result] = await db.insert(messageTable).values(message).returning();
      response.data = result as Tables<'message'>;
    } catch (error) {
      response.error = { status: StatusCodes.INTERNAL_SERVER_ERROR, message: `Error Creating new message` };
    }
    return response;
  }

  async getMessageById(id: number): Promise<RepositoryRespone<Tables<'message'> | null>> {
    let response: RepositoryRespone<Tables<'message'> | null> = {};
    try {
      const [result] = await db.select().from(messageTable).where(eq(messageTable.id, id));
      if (result) {
        response.data = result;
      } else {
        response.error = { status: StatusCodes.NOT_FOUND, message: "Message not found" };
      }
    } catch (error) {
      response.error = { status: StatusCodes.INTERNAL_SERVER_ERROR, message: `Error Getting Message` };
    }
    return response;
  }

  async updateMessage(id: number, message: TablesUpdate<'message'>): Promise<RepositoryRespone<Tables<'message'> | null>> {
    let response: RepositoryRespone<Tables<'message'> | null> = {};
    try {
      const [result] = await db.update(messageTable).set(message).where(eq(messageTable.id, id)).returning();
      if (result) {
        response.data = result;
      } else {
        response.error = { status: StatusCodes.NOT_FOUND, message: "Message not found for updating" };
      }
    } catch (error) {
      response.error = { status: StatusCodes.INTERNAL_SERVER_ERROR, message: `Error Updating Message` };
    }
    return response;
  }

  async deleteMessage(id: number): Promise<RepositoryRespone<void>> {
    let response: RepositoryRespone<void> = {};
    try {
      const deletedCount = await db.delete(messageTable).where(eq(messageTable.id, id));
      if (deletedCount.length === 0) {
        response.error = { status: StatusCodes.NOT_FOUND, message: "Message not found for deletion" };
      }  
    } catch (error) {
      response.error = { status: StatusCodes.INTERNAL_SERVER_ERROR, message: `Error Deleting Message` };
    }
    return response;
  }

  async getMessagesByChatId(chat_id: number): Promise<RepositoryRespone<Tables<'message'>[]>> {
    let response: RepositoryRespone<Tables<'message'>[]> = {};
    try {
      const results = await db.select().from(messageTable).where(eq(messageTable.chat_id, chat_id));
      response.data = results;
    } catch (error) {
      response.error = { status: StatusCodes.INTERNAL_SERVER_ERROR, message: `Error Getting Messages by Chat ID` };
    }
    return response;
  }

  async getAllMessagesOfUser(userEmail: string): Promise<RepositoryRespone<{ content: string }[]>> {
    let response: RepositoryRespone<{ content: string }[]> = { data: [] };
    try {
      const results = await db
        .select({ content: messageTable.content })
        .from(messageTable)
        .innerJoin(chatTable, eq(chatTable.id, messageTable.chat_id))
        .where(eq(chatTable.user_email, userEmail) && eq(messageTable.sender, 'user'));

      response.data = results;
    } catch (error) {
      response.error = { status: StatusCodes.INTERNAL_SERVER_ERROR, message: `Error Getting Messages` };
    }
    return response;
  }
}
