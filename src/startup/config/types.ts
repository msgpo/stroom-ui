export interface Config {
  authenticationServiceUrl?: string;
  authorisationServiceUrl?: string;
  stroomBaseServiceUrl?: string;
  advertisedUrl?: string;
  authUsersUiUrl?: string;
  authTokensUiUrl?: string;
  appClientId?: string;
}

export interface StoreState {
  isReady: boolean;
  values: Config;
}