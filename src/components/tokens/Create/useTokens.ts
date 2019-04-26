import { useTokenState } from "./useTokenState";
import { useApi } from "../api/";
import { Token } from "../api/types";
import { useCallback } from "react";
import useAppNavigation from "components/AppChrome/useAppNavigation";

const useTokens = () => {
  const { token, setEnabled, setToken } = useTokenState();

  const { toggleState: toggleStateApi } = useApi();
  const toggleEnabledState = useCallback(
    (tokenId: string, nextState: boolean) => {
      toggleStateApi(tokenId, nextState).then(() => setEnabled(nextState));
    },
    [toggleStateApi, setEnabled],
  );

  const { fetchApiKey: fetchApiKeyApi } = useApi();
  const fetchApiKey = useCallback(
    (tokenId: string) => {
      fetchApiKeyApi(tokenId).then((apiKey: Token) => {
        setToken(apiKey);
      });
    },
    [fetchApiKeyApi, setToken],
  );

  const { createToken: createTokenApi } = useApi();
  const { goToApiKey } = useAppNavigation();
  const createToken = useCallback(
    (email: string) => {
      createTokenApi(email).then((newToken: Token) => {
        goToApiKey(newToken.id);
      });
    },
    [createTokenApi, goToApiKey],
  );

  return {
    token,
    toggleEnabledState,
    createToken,
    fetchApiKey,
  };
};

export default useTokens;
