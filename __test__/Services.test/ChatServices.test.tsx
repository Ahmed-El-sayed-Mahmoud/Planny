import "reflect-metadata";
import { ChatServices } from "@/src/Planny.Application/Services/ChatServices";
import { mock, instance, when, verify } from "ts-mockito";
import { IChatRepository } from "@/src/Planny.Domain/IRepositories/IChatRepository";
import { IAuthServices } from "@/src/Planny.Application/IServices/IAuthService";
import { StatusCodes } from "@/src/Constants/ErrorStatusCodes";

describe("ChatServices", () => {
  let chatServices: ChatServices;
  let mockChatRepository: IChatRepository;
  let mockAuthServices: IAuthServices;

  beforeEach(() => {
    mockChatRepository = mock<IChatRepository>();
    mockAuthServices = mock<IAuthServices>();

    chatServices = new ChatServices(instance(mockChatRepository), instance(mockAuthServices));
  });

  it("should return UNAUTHORIZED if the user is not authenticated", async () => {
    when(mockAuthServices.getAuthenticatedUser()).thenResolve(null);

    const response = await chatServices.createChat("New Chat");

    expect(response.error?.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.error?.message).toBe("Not Authenticated");
  });

  
});
