"use server";
import { redirect } from "next/navigation";
import { z } from 'zod';
import { getInjection } from "@/src/DI/container";
import { DI_TYPES } from "@/src/DI/DI_TYPES";
import { IAuthServices } from '../../src/Planny.Application/IServices/IAuthService';
import { revalidatePath } from "next/cache";

const ValidateLoginForm=(obj:any)=>{
  const Schema = z.object({
    email: z.string().email("Invalid email address"),
    token:z.string().length(6,"OTP should be 6 Digits").optional()
  });
  const result= Schema.safeParse(obj);
  let errorMessage ="";
  if(!result.success)
  {
   console.log("Error with email")

   result.error.issues.forEach(iss=>{
     errorMessage+=" " +iss.path[0]+" : "+iss.message + " ."
   })
  }
  return errorMessage;
}

export const signIn = async (obj:any ) => {

  // server side validations
  const errors=ValidateLoginForm(obj);
  if(errors)
    return errors

    const auth=getInjection<IAuthServices>(DI_TYPES.IAuthServices)
    const error= await auth.signInWithOTP(obj?.email)

  if (error) {
    console.log("error : " , error)
    return error.message;

  }
    console.log("Check your email for the OTP");
    redirect(`/login/confirm`);
};

export const verifyOTP = async ( obj:any) => {

  //server side validation
  const errors=ValidateLoginForm(obj);
  if(errors)
    return errors

  const auth=getInjection<IAuthServices>(DI_TYPES.IAuthServices)
    const error= await auth.VerifyOTP(obj?.email,obj?.token);
  
  if (error) {
    console.error("Error verifying OTP:", error);
    return error.message;
  }
  revalidatePath("/")
  redirect("/");
};
