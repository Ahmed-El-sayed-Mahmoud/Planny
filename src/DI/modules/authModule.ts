import { IAuthServices } from '@/src/Planny.Application/IServices/IAuthService';
import { DI_TYPES } from '../DI_TYPES';
import { AuthServices } from '@/src/Planny.Application/Services/AuthServices';
import { ContainerModule, interfaces } from "inversify";

const initModule =(bind:interfaces.Bind)=>{
    bind<IAuthServices>(DI_TYPES.IAuthServices).to(AuthServices)
}

export const AuthModule=new ContainerModule(initModule);