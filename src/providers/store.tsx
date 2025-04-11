import createStore from "react-auth-kit/createStore";
import createRefresh from "react-auth-kit/createRefresh";
import { axiosInstance } from "@/lib/axios-instance";

const refresh = createRefresh({
  interval: 10, // The time in sec to refresh the Access token,
  refreshApiCallback: async (param: {
    authToken?: string | undefined;
    refreshToken?: string | undefined;
    authUserState: unknown;
  }) => {
    try {
      const response = await axiosInstance.post("/refresh", param, {
        headers: { Authorization: `Bearer ${param.refreshToken}` },
      });
      console.log("Refreshing");
      return {
        isSuccess: true,
        newAuthToken: response.data.token as string,
        newAuthTokenExpireIn: 10,
        newRefreshTokenExpiresIn: 60,
      };
    } catch (error) {
      console.error(error);
      return {
        isSuccess: false,
        newAuthToken: "", // or some other default value
        newAuthTokenExpireIn: undefined,
        newRefreshTokenExpiresIn: undefined,
      };
    }
  },
});

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
  refresh: refresh,
});

export default store;
