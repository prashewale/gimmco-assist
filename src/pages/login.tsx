import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GalleryVerticalEnd } from "lucide-react";

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
        if (response.errors) {
          toast("Invalid Auth Request", {
            description: response.errors,
          });
          return;
        }

        setIsLoading(false);
        window.location.href = response.content.redirectUrl;
      } else {
        navigate("/");
      }
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
            <GalleryVerticalEnd className="size-4" />
          </div>
          Gimmco Assist
        </a>
        <LoginForm authReqId={authReqId} />
      </div>
    </div>
  );
}
