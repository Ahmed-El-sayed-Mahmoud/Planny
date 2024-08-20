import { AuthError, AuthOtpResponse } from "@supabase/supabase-js";
import { UserResponse } from "@supabase/supabase-js";

export interface IAuthServices {
    isAuthenticated(): Promise<UserResponse>;
    signInWithOTP(email:string):Promise<AuthError|null | undefined>;
    VerifyOTP(email:string,token:string):Promise<AuthError|null | undefined>;

}