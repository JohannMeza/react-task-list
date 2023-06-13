import { auth0Constants } from "../constants/Auth0Constans";

export const auth0Config = {
  domain: auth0Constants.DOMAIN,
  clientId: auth0Constants.CLIENT_ID,
  useRefreshTokens: true,
  onRedirectCallback: (appState) => appState && appState.returnTo ? appState.returnTo : window.location.pathname,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
};