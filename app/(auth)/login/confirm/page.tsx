"use client";
import toast from "react-hot-toast";
import { signIn, verifyOTP } from "../../actions";
import Input from "../../../../components/Input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Confirm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (!storedEmail) {
      router.push('/login');
    } else {
      setEmail(storedEmail);
    }
  }, [router]);

  const ClientAction = async (formData: FormData) => {
    if (!email) {
      router.push('/login');
      return;
    }

    const obj = { email, token: formData.get("token") as string };
    const error = await verifyOTP(obj);
    if (error) {
      toast.error(error);
      return;
    }
    localStorage.removeItem("email");
    toast.success(`Welcome back ${email.split("@")[0]}`);
  };

  const Resend = async () => {
    if (!email) {
      router.push('/login');
      return;
    }

    const error = await signIn({ email });
    if (error) {
      toast.error(error);
    } else {
      toast.success(`New OTP was sent to ${email.slice(0, 5) + "****" + email.slice(-4)}`);
    }
  };

  if (!email) {
    return null; 
  }

  return (
    <div
      className="relative flex flex-col justify-center overflow-hidden bg-gray-50 py-12"
      style={{ height: "calc(100vh - 85px)" }}
    >
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email {email.slice(0, 5) + "****" + email.slice(-4)}</p>
            </div>
          </div>

          <div>
            <form onSubmit={(e) => { e.preventDefault(); ClientAction(new FormData(e.currentTarget)); }}>
              <div className="flex flex-col space-y-16">
                <Input name="token" type="text" placeholder="OTP Received" text="OTP" />

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      disabled={loading}
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-black border-none text-white text-sm shadow-sm"
                    >
                      {loading ? "Verifying...." : "Verify Account"}
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn&apos;t receive code?</p>
                    <p onClick={Resend} className="cursor-pointer">Resend</p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
