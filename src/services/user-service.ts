import { axiosInstance } from "@/lib/axios-instance";
import { ApiResponse, LoginResponse } from "@/lib/types";

export async function loginAsync(
  username: string,
  password: string,
  authReqId: string | null
): Promise<ApiResponse<LoginResponse>> {
  const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
    "/api/auth/login",
    {
      username,
      password,
      authReqId,
    }
  );

  return response.data;
}

export async function checkAuthReqAndRedirect(
  authReqId: string,
  userId: string
): Promise<ApiResponse<void>> {
  const response = await axiosInstance.post<ApiResponse<void>>(
    "/check-auth-request",
    {
      authReqId,
      userId,
    }
  );

  return response.data;
}
