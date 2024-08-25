import { inject, injectable } from "inversify";
import { IAuthServices } from "../IServices/IAuthService";
import { createClient } from "./supabase/server";
import { AuthError, AuthOtpResponse } from "@supabase/supabase-js";
import { DI_TYPES } from "@/src/DI/DI_TYPES";
import type { IUserRepository } from "@/src/Planny.Domain/IRepositories/IUsersRepository";
import { error } from "console";

@injectable()
export class AuthServices implements IAuthServices {
    constructor(
        @inject(DI_TYPES.IUserRepository) 
        private readonly _userRepository: IUserRepository,
    ) {}

    async getAuthenticatedUser(): Promise<{ email: string } | null> {
      console.log("****** get getAuthenticatedUser ********* reached")
        const supabase = createClient();
        const { data, error } = await supabase.auth.getUser();
        console.log("data : ",data)
        
        if (error) {
            console.error("Error fetching authenticated user:", error.message);
            return null;
        }
        
        return data?.user ? { email: data.user.email! } : null;
    }

    async signInWithOTP(email: string): Promise<AuthError | null> {
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOtp({ email });
        
        if (error) {
            console.error("Error during sign in with OTP:", error.message);
        }
        
        return error;
    }

    async VerifyOTP(email: string, token: string): Promise<AuthError | null> {
        const supabase = createClient();
        const { error: verifyError } = await supabase.auth.verifyOtp({
            email,
            token,
            type: 'email',
        });
        
        if (verifyError) {
            console.error("Error verifying OTP:", verifyError.message);
            return verifyError;
        }

        const user = await this._userRepository.getUser(email);
        if (!user.data) {
            const res = await this._userRepository.createUser({ email, name: email });
            if (res.error) {
                console.error("Error creating user after OTP verification:", res.error.message);
                return new AuthError("User creation failed after OTP verification");
            }
        }

        return null;
    }
}
