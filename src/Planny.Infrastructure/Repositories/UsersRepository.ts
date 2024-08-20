import { db } from "../db/index";
import { TablesInsert, Tables } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
import { eq } from "drizzle-orm";
import { injectable } from "inversify";
import { IUserRepository } from "@/src/Planny.Domain/IRepositories/IUsersRepository";
import { usersTable } from "../db/schema"; 
import { RepositoryRespone } from "@/src/Planny.Domain/IRepositories/RepositoryRespnse";

@injectable()
export class UserRepository implements IUserRepository {

  async createUser(user: TablesInsert<'users'>): Promise<RepositoryRespone<Tables<'users'>>> {
    let response: RepositoryRespone<Tables<'users'>> = {};
    try {
      const existingUsers = await db.select().from(usersTable).where(eq(usersTable.email, user.email));
      console.log("useeeeeeeeeeeeeeeeeeer  : ",existingUsers)
      if (existingUsers.length>0) {
        return response;
      }
      
      const [result] = await db.insert(usersTable).values(user).returning();
      response.data = result as Tables<'users'>;
    } catch (error) {
      response.error = "Error Creating new user";
    }
    return response;
  }

  async deleteUser(email: string): Promise<RepositoryRespone<void>> {
    let response: RepositoryRespone<void> = {};
    try {
      await db.delete(usersTable).where(eq(usersTable.email, email));
    } catch (_) {
      response.error = "Error Deleting User";
    }
    return response;
  }
}
