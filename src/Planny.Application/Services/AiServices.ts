import { inject, injectable } from "inversify";
import { IAiServices } from "../IServices/IAiServices";
import { ChatSession, GoogleGenerativeAI } from "@google/generative-ai";
import { AiResponse } from "../ServicesTypes";
import { DI_TYPES } from "@/src/DI/DI_TYPES";
import type{ IAuthServices } from "../IServices/IAuthService";
import { Tables, TablesInsert } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes";
type TransformedMessage = {
    role: 'user' | 'model';
    parts: { text: string }[];
};
@injectable()
export class AiServices implements IAiServices {
    private chat:ChatSession;
constructor(
    @inject(DI_TYPES.IAuthServices)
    private readonly _authServices: IAuthServices
) {

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!); 
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    this.chat = model.startChat({
    history: [],
    generationConfig: {
        maxOutputTokens: 500,
    },
});    
}
    async getResponse(msg: TablesInsert<'message'>): Promise<AiResponse> {
        let response:AiResponse={};
        try {
           /*  const user=await this._authServices.isAuthenticated();
            if(!user.data.user)
            {
                response.error="Not Authenticated";
                return response;
            } */
            response.response = (await this.chat.sendMessage(msg.content)).response.candidates?.at(0)?.content.parts.at(0)?.text;
            /* const x= await this.chat.getHistory()
            x.forEach(element => {
                console.log(element)
            });
            console.log('-----------------------------------------------------------------\n----------------------------------') */
        }
        catch(error)
        {
            response.error="Error Generating Response";
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