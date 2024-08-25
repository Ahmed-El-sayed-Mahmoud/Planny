import { injectable, inject } from "inversify";
import { IChatServices } from "../IServices/IChatServices";
import type { IChatRepository } from "@/src/Planny.Domain/IRepositories/IChatRepository";
import { Tables, TablesInsert, TablesUpdate } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
import { DI_TYPES } from "@/src/DI/DI_TYPES";
import type { IAuthServices } from "../IServices/IAuthService";
import { ServiceResponse } from "../ServiceResponse";
import { StatusCodes } from "@/src/Constants/ErrorStatusCodes";

@injectable()
export class ChatServices implements IChatServices {
  constructor(
    @inject(DI_TYPES.IChatRepository)
    private readonly _chatRepository: IChatRepository,
    @inject(DI_TYPES.IAuthServices)
    private readonly _authServices: IAuthServices
  ) {}

  async createChat(name: string): Promise<ServiceResponse<Tables<'chat'>>> {
    const response: ServiceResponse<Tables<'chat'>> = {};
    console.log("create chat service reaches***************")
    const authUser = await this._authServices.getAuthenticatedUser();
    console.log("user :******** ", authUser)
    if (!authUser) {
      response.error = {
        status: StatusCodes.UNAUTHORIZED,
        message: "Not Authenticated"
      };
      console.log("not auth response",response)
      return response;
    }

    const newChat: TablesInsert<'chat'> = { name, user_email: authUser.email };
    const repoResponse = await this._chatRepository.createChat(newChat);
    console.log("response repo:   ",response)
    if (repoResponse.error) {
      response.error = repoResponse.error;
    } else {
      response.data = repoResponse.data;
    }

    return response;
  }

  async getChatById(id: number): Promise<ServiceResponse<Tables<'chat'>>> {
    const response: ServiceResponse<Tables<'chat'>> = {};

    const authUser = await this._authServices.getAuthenticatedUser();
    if (!authUser) {
      response.error = {
        status: StatusCodes.UNAUTHORIZED,
        message: "Not Authenticated"
      };
      return response;
    }

    const repoResponse = await this._chatRepository.getChatById(id);
    if (repoResponse.error) {
      response.error = repoResponse.error;
    } else {
      response.data = repoResponse.data;
    }

    return response;
  }

  async updateChat(id: number, chat: TablesUpdate<'chat'>): Promise<ServiceResponse<Tables<'chat'>>> {
    const response: ServiceResponse<Tables<'chat'>> = {};

    const authUser = await this._authServices.getAuthenticatedUser();
    if (!authUser) {
      response.error = {
        status: StatusCodes.UNAUTHORIZED,
        message: "Not Authenticated"
      };
      return response;
    }

    const repoResponse = await this._chatRepository.updateChat(id, chat);
    if (repoResponse.error) {
      response.error = repoResponse.error;
    } else {
      response.data = repoResponse.data;
    }

    return response;
  }

  async deleteChat(id: number): Promise<ServiceResponse<void>> {
    const response: ServiceResponse<void> = {};

    const authUser = await this._authServices.getAuthenticatedUser();
    if (!authUser) {
      response.error = {
        status: StatusCodes.UNAUTHORIZED,
        message: "Not Authenticated"
      };
      return response;
    }

    const repoResponse = await this._chatRepository.deleteChat(id);
    if (repoResponse.error) {
      response.error = repoResponse.error;
    } 
    return response;
  }

  async getChatsByUserEmail(): Promise<ServiceResponse<Tables<'chat'>[]>> {
    const response: ServiceResponse<Tables<'chat'>[]> = {};

    const authUser = await this._authServices.getAuthenticatedUser();
    if (!authUser) {
      response.error = {
        status: StatusCodes.UNAUTHORIZED,
        message: "Not Authenticated"
      };
      return response;
    }

    const repoResponse = await this._chatRepository.getChatsByUserEmail(authUser.email);
    if (repoResponse.error) {
      response.error = repoResponse.error;
    } else {
      response.data = repoResponse.data;
    }

    return response;
  }
}
