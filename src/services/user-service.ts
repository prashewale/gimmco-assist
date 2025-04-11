import { axiosInstance } from "@/lib/axios-instance";
import { ApiResponse, LoginResponse } from "@/lib/types";

export async function loginAsync(
  username: string,
  password: string
): Promise<ApiResponse<LoginResponse>> {
  const response = await axiosInstance.post<ApiResponse<LoginResponse>>(
    "/api/auth/login",
    {
      username,
      password,
    }
  );

  return response.data;
}
