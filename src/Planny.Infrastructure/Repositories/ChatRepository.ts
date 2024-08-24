import { db } from "../db/index";
import { TablesInsert, Tables, TablesUpdate } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
import { IChatRepository } from "@/src/Planny.Domain/IRepositories/IChatRepository";
import { chatTable } from "../db/schema";
import { desc, eq } from "drizzle-orm";
import { injectable } from "inversify";
import { RepositoryRespone } from "@/src/Planny.Domain/IRepositories/RepositoryRespnse";
import { StatusCodes } from "@/src/Constants/ErrorStatusCodes";

@injectable()
export class ChatRepository implements IChatRepository {

  async createChat(chat: TablesInsert<'chat'>): Promise<RepositoryRespone<Tables<'chat'>>> {
    const response: RepositoryRespone<Tables<'chat'>> = {};
    try {
      [response.data] = await db.insert(chatTable).values(chat).returning();
    } catch (error) {
      response.error = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Error Creating new chat`
      };
    }
    return response;
  }

  async getChatById(id: number): Promise<RepositoryRespone<Tables<'chat'> | null>> {
    const response: RepositoryRespone<Tables<'chat'> | null> = {};
    try {
      const data = await db.select().from(chatTable).where(eq(chatTable.id, id));
      if (data.length > 0) {
        response.data = data[0];
      } else {
        response.error = {
          status: StatusCodes.NOT_FOUND,
          message: "Chat not found"
        };
      }
    } catch (error) {
      response.error = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Error Getting Chat`
      };
    }
    return response;
  }

  async updateChat(id: number, chat: TablesUpdate<'chat'>): Promise<RepositoryRespone<Tables<'chat'> | null>> {
    const response: RepositoryRespone<Tables<'chat'> | null> = {};
    try {
      const data = await db.update(chatTable).set(chat).where(eq(chatTable.id, id)).returning();
      if (data.length > 0) {
        response.data = data[0];
      } else {
        response.error = {
          status: StatusCodes.NOT_FOUND,
          message: "Chat not found for updating"
        };
      }
    } catch (error) {
      response.error = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Error Updating Chat`
      };
    }
    return response;
  }

  async deleteChat(id: number): Promise<RepositoryRespone<void>> {
    const response: RepositoryRespone<void> = {};
    try {
      const deletedCount = await db.delete(chatTable).where(eq(chatTable.id, id));
      if (deletedCount.length > 0) {
        
      } else {
        response.error = {
          status: StatusCodes.NOT_FOUND,
          message: "Chat not found for deletion"
        };
      }
    } catch (error) {
      response.error = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Error Deleting Chat`
      };
    }
    return response;
  }

  async getChatsByUserEmail(user_email: string): Promise<RepositoryRespone<Tables<'chat'>[]>> {
    const response: RepositoryRespone<Tables<'chat'>[]> = {};
    try {
      response.data = await db
        .select()
        .from(chatTable)
        .where(eq(chatTable.user_email, user_email))
        .orderBy(desc(chatTable.id));
    } catch (error) {
      response.error = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Error Getting Chats by User Email`
      };
    }
    return response;
  }
}
