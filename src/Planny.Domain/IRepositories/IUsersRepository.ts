import { RepositoryRespone } from "@/src/Planny.Domain/IRepositories/RepositoryRespnse";
import { TablesInsert, Tables } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
import { UserResponse } from "@supabase/supabase-js";

export interface IUserRepository {
  createUser(user: TablesInsert<'users'>): Promise<RepositoryRespone<Tables<'users'>>>;
  deleteUser(email: string): Promise<RepositoryRespone<void>>;
  getUser(email:string):Promise<RepositoryRespone<Tables<'users'>|null>>
}