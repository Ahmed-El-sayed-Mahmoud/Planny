import "reflect-metadata";


import { mock, instance, when, verify } from "ts-mockito";
import { MessageServices } from "@/src/Planny.Application/Services/MessageServices";
import { IMessageRepository } from "@/src/Planny.Domain/IRepositories/IMessageRepository";
import { IAuthServices } from "@/src/Planny.Application/IServices/IAuthService";
import { ServiceResponse } from "@/src/Planny.Application/ServiceResponse";
import { StatusCodes } from "@/src/Constants/ErrorStatusCodes";

describe("MessageServices", () => {
  let messageServices: MessageServices;
  let mockMessageRepository: IMessageRepository;
  let mockAuthServices: IAuthServices;

  beforeEach(() => {

    mockMessageRepository = mock<IMessageRepository>();
    mockAuthServices = mock<IAuthServices>();

    messageServices = new MessageServices(instance(mockMessageRepository), instance(mockAuthServices));
  });

  /* it("should return UNAUTHORIZED if the user is not authenticated (createMessage)", async () => {
    // Mock getAuthenticatedUser to return null
    when(mockAuthServices.getAuthenticatedUser()).thenResolve(null);

    const response = await messageServices.createMessage({ content: "Hello", chat_id: 1,sender:'user' });

    // Expectations
    expect(response.error?.status).toBe(StatusCodes.UNAUTHORIZED);
    expect(response.error?.message).toBe("Not Authenticated");
  }); */

  it("should create a new message if the user is authenticated", async () => {
    const user = { email: "test@example.com" };
    const newMessage = { content: "Hello", chat_id: 1, sender: 'user' };
    const messageResponse: ServiceResponse<any> = { data: newMessage };

    when(mockAuthServices.getAuthenticatedUser()).thenResolve(user);


    when(mockMessageRepository.createMessage(newMessage)).thenResolve(messageResponse);

    const response = await messageServices.createMessage(newMessage);

    expect(response.data).toEqual(newMessage);
    verify(mockMessageRepository.createMessage(newMessage)).once();
  });

  it("should handle errors when creating a message", async () => {
    const user = { email: "test@example.com" };
    const newMessage = { content: "Hello", chat_id: 1, sender: 'user' };
    const errorResponse: ServiceResponse<any> = { error: { message: "Error", status: StatusCodes.INTERNAL_SERVER_ERROR } };

    when(mockAuthServices.getAuthenticatedUser()).thenResolve(user);

    when(mockMessageRepository.createMessage(newMessage)).thenResolve(errorResponse);

    const response = await messageServices.createMessage(newMessage);

    expect(response.error?.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.error?.message).toBe("Error");
    verify(mockMessageRepository.createMessage(newMessage)).once();
  });

  it("should handle errors when getting a message by ID", async () => {
    const user = { email: "test@example.com" };
    const messageId = 1;
    const errorResponse: ServiceResponse<any> = { error: { message: "Error", status: StatusCodes.INTERNAL_SERVER_ERROR } };

    when(mockAuthServices.getAuthenticatedUser()).thenResolve(user);

    when(mockMessageRepository.getMessageById(messageId)).thenResolve(errorResponse);

    const response = await messageServices.getMessageById(messageId);

    expect(response.error?.status).toBe(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(response.error?.message).toBe("Error");
    verify(mockMessageRepository.getMessageById(messageId)).once();
  });

  it("should remove stop words from messages", () => {
    const text = "This is a test message with some stop words";
    const filteredText = messageServices['removeStopWords'](text);

    expect(filteredText).toBe("test message stop words");
  });
});
