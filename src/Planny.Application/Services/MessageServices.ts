import { injectable, inject } from "inversify";
import { IMessageServices } from "../IServices/IMessageServices";
import type { IMessageRepository } from "@/src/Planny.Domain/IRepositories/IMessageRepository";
import {
  Tables,
  TablesInsert,
  TablesUpdate,
} from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
import { DI_TYPES } from "@/src/DI/DI_TYPES";
import type { IAuthServices } from "../IServices/IAuthService";
import { ServiceResponse } from "../ServiceResponse";

@injectable()
export class MessageServices implements IMessageServices {
  constructor(
    @inject(DI_TYPES.IMessageRepository)
    private readonly _messageRepository: IMessageRepository,
    @inject(DI_TYPES.IAuthServices)
    private readonly _authServices: IAuthServices
  ) {}

  async createMessage(
    message: TablesInsert<"message">
  ): Promise<ServiceResponse<Tables<"message">>> {
    let response: ServiceResponse<Tables<"message">> = {};

    
      response = await this._messageRepository.createMessage(message);
    

    return response;
  }

  async getMessageById(
    id: number
  ): Promise<ServiceResponse<Tables<"message">>> {
    let response: ServiceResponse<Tables<"message">> = {};

    const isAuth = await this._authServices.isAuthenticated();
    if (!isAuth) {
      response.error = "Not Authenticated User";
    } else {
      response = await this._messageRepository.getMessageById(id);
    }

    return response;
  }

  async updateMessage(
    id: number,
    message: TablesUpdate<"message">
  ): Promise<ServiceResponse<Tables<"message">>> {
    let response: ServiceResponse<Tables<"message">> = {};

    const isAuth = await this._authServices.isAuthenticated();
    if (!isAuth) {
      response.error = "Not Authenticated User";
    } else {
      response = await this._messageRepository.updateMessage(id, message);
    }

    return response;
  }

  async deleteMessage(id: number): Promise<ServiceResponse<void>> {
    let response: ServiceResponse<void> = {};

    const user = await this._authServices.isAuthenticated();
    if (!user.data.user) {
      response.error = "Not Authenticated";
      return response;
    } else {
      await this._messageRepository.deleteMessage(id);
    }

    return response;
  }

  async getMessagesByChatId(
    chatId: number
  ): Promise<ServiceResponse<Tables<"message">[]>> {
    let response: ServiceResponse<Tables<"message">[]> = {};

    const user = await this._authServices.isAuthenticated();
    if (!user.data.user) {
      response.error = "Not Authenticated";
      return response;
    } else {
      response = await this._messageRepository.getMessagesByChatId(chatId);
    }

    return response;
  }
}
