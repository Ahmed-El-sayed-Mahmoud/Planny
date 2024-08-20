import { inject, injectable } from "inversify";
import { IAuthServices } from "../IServices/IAuthService";
import { createClient } from "./supabase/server";
import { cookies } from "next/headers";
import { AuthError, AuthOtpResponse } from "@supabase/supabase-js";
import { DI_TYPES } from "@/src/DI/DI_TYPES";
import type { IUserRepository } from "@/src/Planny.Domain/IRepositories/IUsersRepository";
import { UserResponse } from "@supabase/supabase-js";
@injectable()
export class AuthServices implements IAuthServices {
    constructor(
        @inject(DI_TYPES.IUserRepository) 
        private readonly _userRepository: IUserRepository,
        
      ) {}
    async isAuthenticated(): Promise<UserResponse> {
        const supabase=createClient(cookies())
        const user=(await supabase.auth.getUser());
        return user ; 
    }
    async signInWithOTP(email: string): Promise<AuthError|null> {
        const supabase=createClient(cookies());
        const {error}= await supabase.auth.signInWithOtp({
            email ,
        })
        return error;
    }
    async VerifyOTP(email: string, token: string): Promise<AuthError | null | undefined> {
        const supabase=createClient(cookies());
        const {error}=await supabase.auth.verifyOtp({
            email,
            token,
            type: 'email',
          });
          if(error)
            return error;

          const createUserResponse = await this._userRepository.createUser({ email, name: email });

          if (createUserResponse.error) {
              return new AuthError("User creation failed after OTP verification");
          }
          return null;
                

    }
}