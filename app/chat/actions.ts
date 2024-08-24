"use server";
import { getInjection } from "@/src/DI/container";
import { IAiServices } from "@/src/Planny.Application/IServices/IAiServices";
import { DI_TYPES } from "@/src/DI/DI_TYPES";
import { IChatServices } from "@/src/Planny.Application/IServices/IChatServices";
import {
  Tables,
  TablesInsert,
} from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
import { IMessageServices } from "@/src/Planny.Application/IServices/IMessageServices";


const ai = getInjection<IAiServices>(DI_TYPES.IAiServices);
const chatServices = getInjection<IChatServices>(DI_TYPES.IChatServices);
const messageServices = getInjection<IMessageServices>(
  DI_TYPES.IMessageServices
);
console.log("new serviceeeee object");
export const getResponseAction = async (msg: TablesInsert<"message">) => {
  const res = await ai.getResponse(msg);
  return res;
};

export const LoadChatsAction = async () => {
  const res = await chatServices.getChatsByUserEmail();
  return res;
};
export const LoadNewMessages = async (chatId: number) => {
  const res = await messageServices.getMessagesByChatId(chatId);
  return res;
};
export const SaveMessagesAction = async (
  msg: TablesInsert<"message">,
  response: TablesInsert<"message">
) => {
  const res1 = await messageServices.createMessage(msg);
  if (res1.error) {
    return false;
  }
  const res2 = await messageServices.createMessage(response);
  if (res2.error) {
    return false;
  }

  return true;
};

export const AddChatAction = async (chat: string) => {
  const res = await chatServices.createChat(chat);
  return res;
};

export const ChangeHistoryAction = async (msgs: Tables<"message">[]) => {
  await ai.changeHistory(msgs);
};
