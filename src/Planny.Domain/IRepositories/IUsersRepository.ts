import { RepositoryRespone } from "@/src/Planny.Domain/IRepositories/RepositoryRespnse";
import { TablesInsert, Tables } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";

export interface IUserRepository {
  createUser(user: TablesInsert<'users'>): Promise<RepositoryRespone<Tables<'users'>>>;
  deleteUser(email: string): Promise<RepositoryRespone<void>>;
}