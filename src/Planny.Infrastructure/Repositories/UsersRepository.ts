import { db } from "../db/index";
import { TablesInsert, Tables } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
import { eq } from "drizzle-orm";
import { injectable } from "inversify";
import { IUserRepository } from "@/src/Planny.Domain/IRepositories/IUsersRepository";
import { usersTable } from "../db/schema";
import { RepositoryRespone } from "@/src/Planny.Domain/IRepositories/RepositoryRespnse";
import { StatusCodes } from "@/src/Constants/ErrorStatusCodes";
import { UserResponse } from "@supabase/supabase-js";

@injectable()
export class UserRepository implements IUserRepository {

  async createUser(user: TablesInsert<'users'>): Promise<RepositoryRespone<Tables<'users'>>> {
    let response: RepositoryRespone<Tables<'users'>> = {};
    try {
        const [result] = await db.insert(usersTable).values(user).returning();
      response.data = result;
    } catch (error) {
      response.error = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Error Creating new user`
      };
    }
    return response;
  }

  async deleteUser(email: string): Promise<RepositoryRespone<void>> {
    let response: RepositoryRespone<void> = {};
    try {
      const existingUsers = await db.select().from(usersTable).where(eq(usersTable.email, email));
      if (existingUsers.length === 0) {
        response.error = {
          status: StatusCodes.NOT_FOUND,
          message: "User not found"
        };
        return response;
      }

      await db.delete(usersTable).where(eq(usersTable.email, email));
    } catch (error) {
      response.error = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        message: `Error Deleting User`
      };
    }
    return response;
  }
  async getUser(email: string): Promise<RepositoryRespone<Tables<'users'> | null>> {
    const existingUsers = await db.select().from(usersTable).where(eq(usersTable.email, email));
  
    if (existingUsers.length > 0) {
      return {
        data: existingUsers.at(0) as Tables<'users'>,
      };
    } else {
      return {
        data: null,
      };
    }
  }
}
