'use server'

import { getInjection } from "@/src/DI/container";
import { DI_TYPES } from "@/src/DI/DI_TYPES";
import { IMessageServices } from "@/src/Planny.Application/IServices/IMessageServices";

const msg_services = getInjection<IMessageServices>(DI_TYPES.IMessageServices);
export const getAllMessagesAction=async()=>{
    
    return await msg_services.getAllMessagesOfUser();
    
}