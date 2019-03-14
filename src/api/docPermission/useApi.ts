import { useCallback } from "react";
import useStroomBaseUrl from "../useStroomBaseUrl";

import useHttpClient from "../useHttpClient";
import { DocumentPermissions } from "src/types";

interface Api {
  // Server Side Constant
  getPermissionForDocType: (docRefType: string) => Promise<Array<string>>;

  // By Doc and User
  getPermissionsForDocumentForUser: (
    docRefUuid: string,
    userUuid: string
  ) => Promise<Array<string>>;
  addDocPermission: (
    docRefUuid: string,
    userUuid: string,
    permissionName: string
  ) => Promise<void>;
  removeDocPermission: (
    docRefUuid: string,
    userUuid: string,
    permissionName: string
  ) => Promise<void>;

  // By Doc
  getPermissionForDoc: (docRefUuid: string) => Promise<DocumentPermissions>;
  clearDocPermissionsForUser: (
    docRefUuid: string,
    userUuid: string
  ) => Promise<void>;
  clearDocPermissions: (docRefUuid: string) => Promise<void>;
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

  const getPermissionForDocType = useCallback(
    (docRefType: string): Promise<Array<string>> => {
      const state = store.getState();
      var url = `${stroomBaseServiceUrl}/docPermissions/v1/forDocType/${docRefType}`;

      return httpGetJson(url);
    },
    [httpGetJson]
  );

  const getPermissionsForDocumentForUser = useCallback(
    (docRefUuid: string, userUuid: string): Promise<Array<string>> => {
      const state = store.getState();
      var url = `${stroomBaseServiceUrl}/docPermissions/v1/forDocForUser/${docRefUuid}/${userUuid}`;

      return httpGetJson(url);
    },
    [httpGetJson]
  );

  const addDocPermission = useCallback(
    (
      docRefUuid: string,
      userUuid: string,
      permissionName: string
    ): Promise<void> => {
      const state = store.getState();
      var url = `${stroomBaseServiceUrl}/docPermissions/v1/forDocForUser/${docRefUuid}/${userUuid}/${permissionName}`;

      return httpPostEmptyResponse(url);
    },
    [httpPostEmptyResponse]
  );

  const removeDocPermission = useCallback(
    (
      docRefUuid: string,
      userUuid: string,
      permissionName: string
    ): Promise<void> => {
      const state = store.getState();
      var url = `${stroomBaseServiceUrl}/docPermissions/v1/forDocForUser/${docRefUuid}/${userUuid}/${permissionName}`;

      return httpDeleteEmptyResponse(url);
    },
    [httpDeleteEmptyResponse]
  );

  const getPermissionForDoc = useCallback(
    (docRefUuid: string) => {
      const state = store.getState();
      var url = `${stroomBaseServiceUrl}/docPermissions/v1/forDoc/${docRefUuid}`;

      return httpGetJson(url);
    },
    [httpGetJson]
  );

  const clearDocPermissionsForUser = useCallback(
    (docRefUuid: string, userUuid: string) => {
      const state = store.getState();
      var url = `${stroomBaseServiceUrl}/docPermissions/v1/forDocForUser/${docRefUuid}/${userUuid}`;

      return httpDeleteEmptyResponse(url);
    },
    [httpDeleteEmptyResponse]
  );

  const clearDocPermissions = useCallback(
    (docRefUuid: string) => {
      const state = store.getState();
      var url = `${stroomBaseServiceUrl}/docPermissions/v1/forDoc/${docRefUuid}`;

      return httpDeleteEmptyResponse(url);
    },
    [httpDeleteEmptyResponse]
  );

  return {
    getPermissionForDocType,
    getPermissionForDoc,
    getPermissionsForDocumentForUser,
    addDocPermission,
    removeDocPermission,
    clearDocPermissionsForUser,
    clearDocPermissions
  };
};

export default useApi;
