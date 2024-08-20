import { injectable, inject } from "inversify";
import { IChatServices } from "../IServices/IChatServices";
import type { IChatRepository } from "@/src/Planny.Domain/IRepositories/IChatRepository";
import { Tables, TablesInsert, TablesUpdate } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
import { DI_TYPES } from "@/src/DI/DI_TYPES";
import type{ IAuthServices } from "../IServices/IAuthService";
import { ServiceResponse } from "../ServiceResponse";

@injectable()
export class ChatServices implements IChatServices {
  constructor(
    @inject(DI_TYPES.IChatRepository) 
    private readonly _chatRepository: IChatRepository,
    @inject(DI_TYPES.IAuthServices)
    private readonly _authServices: IAuthServices
  ) {}

  async createChat(name: string): Promise<ServiceResponse<Tables<'chat'>>> {
    
    let response: ServiceResponse<Tables<'chat'>> = { };
    const user=await this._authServices.isAuthenticated();
    if(!user.data.user)
    {
        response.error="Not Authenticated";
        return response;
    }
    const email=user.data.user.email;
    if(email)
    {
      const newChat:TablesInsert<'chat'>={name,user_email:email};
      response.data = (await this._chatRepository.createChat(newChat))?.data;
    }
      
    else
      response.error="Error Getting Chats"

      return response;
  }

  async getChatById(id: number): Promise<ServiceResponse<Tables<'chat'>>> {
    
    let response: ServiceResponse<Tables<'chat'>> = { };
    const user=await this._authServices.isAuthenticated();
    if(!user.data.user)
    {
        response.error="Not Authenticated";
        return response;
    }
    response=(await this._chatRepository.getChatById(id))
    return response;
  }

  async updateChat(id: number, chat: TablesUpdate<'chat'>): Promise<ServiceResponse<Tables<'chat'>>> {
    let response: ServiceResponse<Tables<'chat'>> = { };

    const user=await this._authServices.isAuthenticated();
            if(!user.data.user)
            {
                response.error="Not Authenticated";
                return response;
            }

    response=await this._chatRepository.updateChat(id,chat);

    return response;
  }

  async deleteChat(id: number): Promise<ServiceResponse<void>> {
    const response: ServiceResponse<void> = { };

    const user=await this._authServices.isAuthenticated();
            if(!user.data.user)
            {
                response.error="Not Authenticated";
                return response;
            }
    else
      await this._chatRepository.deleteChat(id);

    return response;
  }

  async getChatsByUserEmail(): Promise<ServiceResponse<Tables<'chat'>[]>> {
    let response: ServiceResponse<Tables<'chat'>[]> = { };
    const user=await this._authServices.isAuthenticated();
            if(!user.data.user)
            {
                response.error="Not Authenticated";
                return response;
            }
            const email=user.data.user.email;
            if(email)
              response.data = (await this._chatRepository.getChatsByUserEmail(email))?.data;
            else
              response.error="Error Getting Chats"
   
    return response;
  }
}
