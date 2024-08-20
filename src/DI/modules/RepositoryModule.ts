import { ContainerModule, interfaces } from "inversify";
import { DI_TYPES } from "../DI_TYPES";
import { IChatRepository } from "@/src/Planny.Domain/IRepositories/IChatRepository";
import { ChatRepository } from "@/src/Planny.Infrastructure/Repositories/ChatRepository";
import { IMessageRepository } from "@/src/Planny.Domain/IRepositories/IMessageRepository";
import { MessageRepository } from '@/src/Planny.Infrastructure/Repositories/MessageRepository';
import { IUserRepository } from "@/src/Planny.Domain/IRepositories/IUsersRepository";
import { UserRepository } from "@/src/Planny.Infrastructure/Repositories/UsersRepository";

const initModule =(bind:interfaces.Bind)=>{
    bind<IChatRepository>(DI_TYPES.IChatRepository).to(ChatRepository)
    bind<IMessageRepository>(DI_TYPES.IMessageRepository).to(MessageRepository)
    bind<IUserRepository>(DI_TYPES.IUserRepository).to(UserRepository)
}

export const RepoistoryModule=new ContainerModule(initModule);