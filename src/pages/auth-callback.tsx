import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AuthCallback() {
  const navigate = useNavigate();

  const { signInRedirectCallback } = useAuth();

  const params = new URLSearchParams(window.location.search);
  console.log(params.get("code"));
  console.log(params.get("state"));
  useEffect(() => {
    signInRedirectCallback()
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Auth Error", error));
  }, []);

  return <div>Loading...</div>;
}
