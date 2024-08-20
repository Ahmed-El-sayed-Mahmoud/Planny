import { Tables, TablesInsert } from "@/src/Planny.Domain/EntitiesTypes/EntityTypes"
import { AiResponse } from "../ServicesTypes"
export interface IAiServices{

    getResponse(msg:TablesInsert<'message'>):Promise<AiResponse>
    changeHistory(msgs:Tables<'message'>[]):void
}