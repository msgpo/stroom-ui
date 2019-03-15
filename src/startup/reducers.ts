/*
 * Copyright 2018 Crown Copyright
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { combineReducers } from "redux";

import {
  reducer as errorPage,
  StoreState as ErrorPageState
} from "../components/ErrorPage";

import {
  authenticationReducer as authentication,
  authorisationReducer as authorisation,
  AuthenticationStoreState,
  AuthorisationStoreState
} from "./Authentication";

import {
  reducer as appPermissions,
  StoreState as AppPermissionStoreState
} from "../api/appPermission";
import {
  reducer as docPermissions,
  StoreState as DocPermissionStoreState
} from "../api/docPermission";
import {
  reducer as userGroups,
  StoreState as UserGroupStoreState
} from "../api/userGroups";
import {
  reducer as folderExplorer,
  StoreState as FolderExplorerStoreState
} from "../api/explorer";
import {
  reducer as pipelineEditor,
  StoreState as PipelineEditorStoreState
} from "../api/pipelineDocument";
import {
  reducer as elements,
  StoreState as ElementStoreState
} from "../api/elements";
import {
  reducer as debuggers,
  StoreState as DebuggersStoreState
} from "../components/PipelineDebugger";
import {
  reducer as indexVolumeGroups,
  StoreState as IndexVolumeGroupStoreState
} from "../api/indexVolumeGroup";
import {
  reducer as indexVolumes,
  StoreState as IndexVolumeStoreState
} from "../api/indexVolume";
import {
  reducer as docRefEditors,
  StoreState as DocRefEditorStoreState
} from "../components/DocRefEditor";

export interface GlobalStoreState {
  appPermissions: AppPermissionStoreState;
  docPermissions: DocPermissionStoreState;
  errorPage: ErrorPageState;
  authentication: AuthenticationStoreState;
  authorisation: AuthorisationStoreState;
  folderExplorer: FolderExplorerStoreState;
  pipelineEditor: PipelineEditorStoreState;
  debuggers: DebuggersStoreState;
  userGroups: UserGroupStoreState;
  indexVolumeGroups: IndexVolumeGroupStoreState;
  indexVolumes: IndexVolumeStoreState;
  docRefEditors: DocRefEditorStoreState;
  elements: ElementStoreState;
}

export default combineReducers({
  appPermissions,
  docPermissions,
  errorPage,
  authentication,
  authorisation,
  folderExplorer,
  pipelineEditor,
  debuggers,
  userGroups,
  indexVolumeGroups,
  indexVolumes,
  docRefEditors,
  elements
});
