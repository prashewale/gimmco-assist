import React from "react";
import { Button } from "../ui/button";
import { UserManager, WebStorageStateStore } from "oidc-client-ts";
import { PublicClientApplication } from "@azure/msal-browser";

// const oidcConfig = {
//   authority:
//     "https://caterp.b2clogin.com/caterp.onmicrosoft.com/B2C_1_Gimmco_SignIn_SignUp",
//   client_id: "21921ab6-e2b9-4272-95b8-df9abd71e3d3",
//   redirect_uri: "http://localhost:5173/auth-callback",
//   response_type: "id_token",
//   scope: "openid",
//   post_logout_redirect_uri: "http://localhost:5173/",
//   loadUserInfo: false,
//   stateStore: new WebStorageStateStore({ store: window.localStorage }), // ✅ Ensures state is stored properly
//   userStore: new WebStorageStateStore({ store: window.localStorage }), // Use localStorage instead of sessionStorage
// };

// const CaterpillerButton = () => {
//   const userManager = new UserManager(oidcConfig);

//   const login = async () => {
//     // const msalInstance = new PublicClientApplication({
//     //   auth: {
//     //     clientId: "21921ab6-e2b9-4272-95b8-df9abd71e3d3",
//     //     authority:
//     //       "https://caterp.b2clogin.com/caterp.onmicrosoft.com/B2C_1_Gimmco_SignIn_SignUp",
//     //     redirectUri: "http://localhost:5173/auth-callback",
//     //   },
//     //   cache: {
//     //     cacheLocation: "localStorage",
//     //     storeAuthStateInCookie: false,
//     //   },
//     // });

//     // await msalInstance.initialize();

//     // await msalInstance.loginRedirect({
//     //   scopes: ["openid"],
//     // });

//     userManager.signinRedirect();
//   };

//   return (
//     <Button className="float-right" onClick={login}>
//       My Caterpiller
//     </Button>
//   );
// };

// export default CaterpillerButton;

const CaterpillerButton = () => {
  const caterpillarTenantId = "caterp";
  const clientId = "21921ab6-e2b9-4272-95b8-df9abd71e3d3";
  const redirectUri = "http://localhost:5173/auth-callback";
  const policyName = "B2C_1_Gimmco_SignIn_SignUp";
  const responseType = "id_token";
  const scope = "openid profile email";

  const handleLogin = () => {
    const authUrl = `https://${caterpillarTenantId}.b2clogin.com/${caterpillarTenantId}.onmicrosoft.com/${policyName}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  };

  return (
    <Button className="float-right" onClick={handleLogin}>
      Login to Caterpillar
    </Button>
  );
};

export default CaterpillerButton;
