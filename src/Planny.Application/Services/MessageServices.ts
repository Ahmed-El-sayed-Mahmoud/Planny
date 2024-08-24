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
import { removeStopwords } from 'stopword';
import { StatusCodes } from "@/src/Constants/ErrorStatusCodes";

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

    /* const authUser = await this._authServices.getAuthenticatedUser();
    if (!authUser) {
      response.error = {
        message: "Not Authenticated",
        status: StatusCodes.UNAUTHORIZED
      };
      return response;
    } */
 
    response = await this._messageRepository.createMessage(message);

    return response;
  }

  async getMessageById(
    id: number
  ): Promise<ServiceResponse<Tables<"message">>> {
    let response: ServiceResponse<Tables<"message">> = {};

    const authUser = await this._authServices.getAuthenticatedUser();
    if (!authUser) {
      response.error = {
        message: "Not Authenticated",
        status: StatusCodes.UNAUTHORIZED
      };
      return response;
    }

    response = await this._messageRepository.getMessageById(id);

    return response;
  }

  async updateMessage(
    id: number,
    message: TablesUpdate<"message">
  ): Promise<ServiceResponse<Tables<"message">>> {
    let response: ServiceResponse<Tables<"message">> = {};

    const authUser = await this._authServices.getAuthenticatedUser();
    if (!authUser) {
      response.error = {
        message: "Not Authenticated",
        status: StatusCodes.UNAUTHORIZED
      };
      return response;
    }

    response = await this._messageRepository.updateMessage(id, message);

    return response;
  }

  async deleteMessage(id: number): Promise<ServiceResponse<void>> {
    let response: ServiceResponse<void> = {};

    const authUser = await this._authServices.getAuthenticatedUser();
    if (!authUser) {
      response.error = {
        message: "Not Authenticated",
        status: StatusCodes.UNAUTHORIZED
      };
      return response;
    }

    response = await this._messageRepository.deleteMessage(id);

    return response;
  }

  async getMessagesByChatId(
    chatId: number
  ): Promise<ServiceResponse<Tables<"message">[]>> {
    let response: ServiceResponse<Tables<"message">[]> = {};

    const authUser = await this._authServices.getAuthenticatedUser();
    if (!authUser) {
      response.error = {
        message: "Not Authenticated",
        status: StatusCodes.UNAUTHORIZED
      };
      return response;
    }

    response = await this._messageRepository.getMessagesByChatId(chatId);

    return response;
  }

  async getAllMessagesOfUser(): Promise<ServiceResponse<string>> {
    let response: ServiceResponse<string> = {};
    const authUser = await this._authServices.getAuthenticatedUser();
    if (!authUser) {
      response.error = {
        message: "Not Authenticated",
        status: StatusCodes.UNAUTHORIZED
      };
      return response;
    }

    const userEmail = authUser.email;

    const repoResponse = await this._messageRepository.getAllMessagesOfUser(userEmail);
    if (repoResponse.error) {
      response.error = {
        message: repoResponse.error.message,
        status: StatusCodes.INTERNAL_SERVER_ERROR
      };
      return response;
    }

    const concatenatedMessages = repoResponse.data?.map(row => row.content).join(" ");
    const filteredContent = this.removeStopWords(concatenatedMessages!);

    if (filteredContent.length === 0) {
      response.error = {
        message: "Not enough Messages to construct the Word cloud",
        status: StatusCodes.BAD_REQUEST
      };
    } else {
      response.data = filteredContent;
    }

    return response;
  }

  private removeStopWords(text: string): string {
    return removeStopwords(text.split(" ")).join(" ");
  }
}
