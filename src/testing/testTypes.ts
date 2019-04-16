import { StreamTaskType, StreamAttributeMapResult } from "../types";
import { ResourcesByDocType } from "src/api/useDocumentApi/types/resourceUrls";
import { DocRefTree, DocumentBase } from "src/api/useDocumentApi/types/base";
import { DataSourceType } from "src/components/ExpressionBuilder/types";
import { User } from "src/api/userGroups";
import { IndexVolume } from "src/components/IndexVolumes/api/indexVolume";
import {
  IndexVolumeGroup,
  IndexVolumeGroupMembership,
} from "src/components/IndexVolumeGroups/api/indexVolumeGroup";
import {
  ElementDefinition,
  ElementPropertiesByElementIdType,
} from "src/api/useElements/types";

export interface UserGroupMembership {
  userUuid: string;
  groupUuid: string;
}

export interface UserDocPermission {
  userUuid: string;
  docRefUuid: string;
  permissionName: string;
}

export interface TestData {
  docRefTypes: string[];
  documentTree: DocRefTree;
  elements: ElementDefinition[];
  elementProperties: ElementPropertiesByElementIdType;
  documents: {
    [docRefType in keyof ResourcesByDocType]: DocumentBase<docRefType>[]
  };
  trackers: StreamTaskType[];
  dataList: StreamAttributeMapResult;
  dataSource: DataSourceType;
  usersAndGroups: {
    users: User[];
    userGroupMemberships: UserGroupMembership[];
  };
  indexVolumesAndGroups: {
    volumes: IndexVolume[];
    groups: IndexVolumeGroup[];
    groupMemberships: IndexVolumeGroupMembership[];
  };
  allAppPermissions: string[];
  userAppPermissions: {
    [userUuid: string]: string[];
  };
  docPermissionByType: {
    [docType: string]: string[];
  };
  userDocPermission: UserDocPermission[];
}
