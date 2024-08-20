"use client";
import toast from "react-hot-toast";
import { signIn } from "../actions";
import Input from "../../../components/Input";
import { useState } from "react";

export default function Auth() {
  const [loading, setLoading] = useState(false);

  const clientAction = async (formdata: FormData) => {
    const email = formdata.get("email") as string;
    const obj = { email };
    
    setLoading(true);
    const toastId = toast.loading("Sending OTP...");
    
    let error = await signIn(obj);
    
    toast.dismiss(toastId);
    
    if (error) {
      toast.error(error);
      setLoading(false);
      return;
    }
    
    toast.success("OTP sent successfully!");
    setLoading(false);
    localStorage.setItem("email", email);
  };

  return (
    <div className="flex items-center justify-center " style={{ height: "calc(100vh - 85px)" }}>
      <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
            <p className="mt-2 text-gray-500">Sign in below to access your account with OTP</p>
          </div>
          <div className="mt-5">
            <form action={clientAction}>
              <Input name="email" type="email" placeholder="example@gmail.com" text="Email Address" />
              <div className="my-6">
                <button
                  disabled={loading}
                  type="submit"
                  className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                >
                  {loading ? "Sending Email..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
