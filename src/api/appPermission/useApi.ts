import { useCallback } from "react";
import useStroomBaseUrl from "../useStroomBaseUrl";

import useHttpClient from "../useHttpClient";

interface Api {
  getPermissionsForUser: (userUuid: string) => Promise<Array<string>>;
  getAllPermissionNames: () => Promise<Array<string>>;
  addAppPermission: (userUuid: string, permissionName: string) => Promise<void>;
  removeAppPermission: (
    userUuid: string,
    permissionName: string
  ) => Promise<void>;
}

export const useApi = (): Api => {
  const stroomBaseServiceUrl = useStroomBaseUrl();

  const {
    httpGetJson,
    httpPostEmptyResponse,
    httpDeleteEmptyResponse
  } = useHttpClient();

  if (!store) {
    throw new Error("Could not get Redux Store for processing Thunks");
  }

  const getPermissionsForUser = useCallback(
    (userUuid: string): Promise<Array<string>> => {
      const state = store.getState();
      var url = `${stroomBaseServiceUrl}/appPermissions/v1/${userUuid}`;

      return httpGetJson(url);
    },
    [httpGetJson]
  );

  const getAllPermissionNames = useCallback((): Promise<Array<string>> => {
    const state = store.getState();
    var url = `${stroomBaseServiceUrl}/appPermissions/v1`;

    return httpGetJson(url);
  }, [httpGetJson]);

  const addAppPermission = useCallback(
    (userUuid: string, permissionName: string): Promise<void> => {
      const state = store.getState();
      var url = `${stroomBaseServiceUrl}/appPermissions/v1/${userUuid}/${permissionName}`;

      return httpPostEmptyResponse(url);
    },
    [httpPostEmptyResponse]
  );

  const removeAppPermission = useCallback(
    (userUuid: string, permissionName: string): Promise<void> => {
      const state = store.getState();
      var url = `${stroomBaseServiceUrl}/appPermissions/v1/${userUuid}/${permissionName}`;

      return httpDeleteEmptyResponse(url);
    },
    [httpDeleteEmptyResponse]
  );

  return {
    getPermissionsForUser,
    getAllPermissionNames,
    addAppPermission,
    removeAppPermission
  };
};

export default useApi;
