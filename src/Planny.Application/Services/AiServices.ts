
import { inject, injectable } from "inversify";
import { IAiServices } from "../IServices/IAiServices";
import { ChatSession, GoogleGenerativeAI, ModelParams } from "@google/generative-ai";
import { AiResponse } from "../AiServiceResponse";
import { DI_TYPES } from "@/src/DI/DI_TYPES";
import type{ IAuthServices } from "../IServices/IAuthService";
import { Tables, TablesInsert } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
import { PromptTemplate } from "langchain/prompts";
import { StructuredOutputParser } from "langchain/output_parsers";
import { z } from "zod";
type TransformedMessage = {
    role: 'user' | 'model';
    parts: { text: string }[];
};
@injectable()
export class AiServices implements IAiServices {
    private chat:ChatSession;
    private prompt:PromptTemplate;
    private parser:StructuredOutputParser<z.ZodObject<any>>;
constructor(
    @inject(DI_TYPES.IAuthServices)
    private readonly _authServices: IAuthServices
) {

    this.parser = StructuredOutputParser.fromZodSchema(
        z.object({
            answer: z.string(),  
            suggestions: z.array(z.string()) 
        })
    );

    const formatInstructions = this.parser.getFormatInstructions();

         this.prompt = new PromptTemplate({
            template: `
            You are an AI specialized in event planning. Your role is to provide accurate and helpful responses related to event planning, greetings, and any questions concerning previous information shared in the chat history. 
    
            **Focus exclusively on event planning** and use chat history to guide your responses. Ensure that all replies are relevant and useful for the ongoing event planning discussion.
    
            **After generating your response**, include a list of **up to 3 suggestions** for the user's next message. These suggestions should be:
            - **Statements or prompts** that predict the user next message.
            - **Practical and contextually relevant**, reflecting the user's current needs or conversation history.
            - **Not questions**.
    
            **Example Suggestions:**
            If the user mentioned they have an event, you might suggest:
            - "Family event"
            - "Formal event"
            - "Casual gathering"
    
            Ensure the suggestions are directly related to the ongoing discussion and help the user to continue the conversation effectively.
    
            {format_instructions}
            Question: {question}
        `,
        inputVariables: ["question"],
        partialVariables: { format_instructions: formatInstructions }
    });

    const model = new GoogleGenerativeAI(  process.env.GEMINI_API_KEY! );
    const chatModel = model.getGenerativeModel({ model: "gemini-pro" });

     this.chat =  chatModel.startChat({
        history: [],
        generationConfig: {
            maxOutputTokens: 500,
        },
    });
}
async getResponse(msg: TablesInsert<'message'>): Promise<AiResponse> {
    let response: AiResponse = {};
    try {
        

        const input = await this.prompt.format({
            question: msg.content
        });

        console.log(input)
        const chatResponse = await this.chat.sendMessage(input);
        let textResponse = chatResponse.response.candidates?.at(0)?.content.parts.at(0)?.text;
        console.log("Response : ",textResponse)
       // textResponse = textResponse?.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsedResponse = await this.parser.parse(textResponse!);
        response.response = parsedResponse.answer;
        if (parsedResponse.suggestions) {
            console.log("Suggestions: ", parsedResponse.suggestions);
            response.suggestions=parsedResponse.suggestions;
        }

    } catch (error) {
        console.error("Error Generating Response:", error);
        response.error = {
            status:500,
            message:"Error Generating Response"
        }
    }
    return response;
}
    changeHistory(msgs: Tables<'message'>[]): void {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        this.chat = model.startChat({
            history: this.transformMessages(msgs),
            generationConfig: {
                maxOutputTokens: 500,
            },
        })
    }
    
    transformMessages(messages: Tables<'message'>[]): TransformedMessage[] {
        return messages.map(message => ({
            
            role: message.sender === 'user' ? 'user' : 'model',
            parts: [{ text: message.content }]
        }));
    }
}