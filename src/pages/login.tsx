import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GalleryVerticalEnd, Loader2 } from "lucide-react";

import { LoginForm } from "@/components/forms/login-form";
import { checkAuthReqAndRedirect } from "@/services/user-service";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "@/lib/types";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const authUser = useAuthUser<User>();

  const queryParams = new URLSearchParams(window.location.search);
  const authReqId = queryParams.get("authReqId");

  const processAndNavigate = async () => {
    if (authUser) {
      if (authReqId) {
        setIsLoading(true);
        const response = await checkAuthReqAndRedirect(authReqId, authUser._id);
        if (response.errors.length > 0) {
          toast("Invalid Auth Request", {
            description: response.errors,
          });
          return;
        }

        window.location.href = response.content.redirectUrl;
      } else {
        navigate("/");
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    processAndNavigate();
  }, []);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-5" />
          </div>
          <span className="text-2xl">Gimmco Assist</span>
        </a>
        {isLoading ? (
          <div className="flex items-center justify-center flex-col">
            <Loader2 className="h-12 w-12 animate-spin" />
            <p className="font-semibold text-xl">We are signing you in...</p>
          </div>
        ) : (
          <LoginForm authReqId={authReqId} />
        )}
      </div>
    </div>
  );
}
