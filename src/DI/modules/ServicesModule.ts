import { MessageServices } from '@/src/Planny.Application/Services/MessageServices';
import { IChatServices } from "@/src/Planny.Application/IServices/IChatServices";
import { ContainerModule, interfaces } from "inversify";
import { DI_TYPES } from "../DI_TYPES";
import { ChatServices } from "@/src/Planny.Application/Services/ChatServices";
import { IMessageServices } from "@/src/Planny.Application/IServices/IMessageServices";
import { IAiServices } from '@/src/Planny.Application/IServices/IAiServices';
import { AiServices } from '@/src/Planny.Application/Services/AiServices';

const initModule =(bind:interfaces.Bind)=>{
    bind<IChatServices>(DI_TYPES.IChatServices).to(ChatServices)
    bind<IMessageServices>(DI_TYPES.IMessageServices).to(MessageServices)
    bind<IAiServices>(DI_TYPES.IAiServices).to(AiServices)
}

export const ServicesModule=new ContainerModule(initModule);