import { AuthenticationConfig } from '@iad-os/react-ghost-auth';

const tenantId = import.meta.env.VITE_AUTH_TENANT_ID;
const clientId = import.meta.env.VITE_AUTH_CLIENT_ID;
const redirectUri = import.meta.env.VITE_AUTH_REDIRECT_URI;
const logoutRedirectUri = import.meta.env.VITE_AUTH_LOGOUT_URI;

const baseUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0`;

const authConfig: AuthenticationConfig = {
  providers: [
    {
      name: 'Consuntivi Iad',
      issuer: `${baseUrl}/authorize`,
      authorization_endpoint: `${baseUrl}/authorize`,
      token_endpoint: `${baseUrl}/token`,
      client_id: clientId,
      requested_scopes: 'openid email profile',
      redirect_uri: redirectUri,
      end_session_endpoint: `${baseUrl}/logout`,
      redirect_logout_uri: logoutRedirectUri,
      pkce: true,
      defualt: true,
    },
  ],
};

export default authConfig;
