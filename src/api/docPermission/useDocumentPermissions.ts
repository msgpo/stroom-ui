import { useEffect, useCallback, useMemo } from "react";

import useApi from "./useApi";
import { useActionCreators } from "./redux";
import useReduxState from "../../lib/useReduxState";

/**
 * Encapsulates the management of permissions for a given document, for all users with an interest in that document.
 */
interface UseDocumentPermissions {
  permissionsByUser: {
    [userUuid: string]: Array<string>;
  };
  // This will create a client side only, empty record of permissions.
  // This allows the user to build permissions for a new user, but if no permissions
  // are added, and the page is refreshed, this new user would then be cleared.
  preparePermissionsForUser: (userUuid: string) => void;
  clearPermissionForUser: (userUuid: string) => void;
  clearPermissions: () => void;
}

export default (docRefUuid: string | undefined): UseDocumentPermissions => {
  const {
    getPermissionForDoc,
    clearDocPermissions,
    clearDocPermissionsForUser
  } = useApi();
  const {
    permissionsForDocumentReceived,
    documentPermissionsCleared,
    documentPermissionsClearedForUser,
    permissionsForDocumentForUserReceived
  } = useActionCreators();

  useEffect(() => {
    if (!!docRefUuid) {
      getPermissionForDoc(docRefUuid).then(d =>
        permissionsForDocumentReceived(docRefUuid, d)
      );
    }
  }, [docRefUuid, getPermissionForDoc, permissionsForDocumentReceived]);

  const preparePermissionsForUser = useCallback(
    (userUuid: string) => {
      if (!!docRefUuid) {
        permissionsForDocumentForUserReceived(docRefUuid, userUuid, []);
      }
    },
    [docRefUuid, permissionsForDocumentForUserReceived]
  );

  const clearPermissions = useCallback(() => {
    if (!!docRefUuid) {
      clearDocPermissions(docRefUuid).then(() =>
        documentPermissionsCleared(docRefUuid)
      );
    }
  }, [docRefUuid, clearDocPermissions, documentPermissionsCleared]);

  const permissions = useReduxState(
    ({ docPermissions: { permissions } }) => permissions
  );

  const clearPermissionForUser = useCallback(
    (userUuid: string) => {
      if (!!docRefUuid) {
        clearDocPermissionsForUser(docRefUuid, userUuid).then(() =>
          documentPermissionsClearedForUser(docRefUuid, userUuid)
        );
      }
    },
    [docRefUuid, clearDocPermissionsForUser, documentPermissionsClearedForUser]
  );

  const permissionsByUser = useMemo(() => {
    return permissions
      .filter(d => d.docRefUuid === docRefUuid)
      .reduce((acc, curr) => {
        return {
          ...acc,
          [curr.userUuid]: [curr.permissionNames]
        };
      }, {});
  }, [docRefUuid, permissions]);

  return {
    permissionsByUser,
    preparePermissionsForUser,
    clearPermissionForUser,
    clearPermissions
  };
};
