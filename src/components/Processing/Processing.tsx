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

import * as React from "react";
import { useEffect, useCallback, useState } from "react";
import PanelGroup from "react-panelgroup";

import IconHeader from "../../components/IconHeader";
import { useStreamTasks } from "../../api/streamTasks";
import ProcessingList from "./ProcessingList";
import { StreamTaskType } from "src/types";
import ProcessingDetails from "./ProcessingDetails";
import ProcessingSearchHelp from "./ProcessingSearchHelp";

const ProcessingContainer = () => {
  const streamTasksApi = useStreamTasks();
  const {
    fetchTrackers,
    resetPaging,
    enableToggle,
    updateSearchCriteria,
    fetchParameters: { searchCriteria }
  } = streamTasksApi;

  const onHandleSearchChange: React.ChangeEventHandler<
    HTMLInputElement
  > = useCallback(
    ({ target: { value } }) => {
      console.log({ value });
      resetPaging();
      updateSearchCriteria(value);
      // This line enables search as you type. Whether we want it or not depends on performance
      fetchTrackers();
    },
    [fetchTrackers, updateSearchCriteria, resetPaging]
  );

  const [selectedTracker, setSelectedTracker] = useState<
    StreamTaskType | undefined
  >(undefined);
  const onSelectionChanged = useCallback(
    (selectedItems: Array<StreamTaskType>) => {
      if (selectedItems.length === 1) {
        setSelectedTracker(selectedItems[0]);
      } else {
        setSelectedTracker(undefined);
      }
    },
    [setSelectedTracker]
  );

  const enableToggleSelected = useCallback(() => {
    if (!!selectedTracker && !!selectedTracker.filterId) {
      enableToggle(selectedTracker.filterId);
    }
  }, [enableToggle]);

  useEffect(() => {
    fetchTrackers();

    const onResize = () => {
      resetPaging();
      fetchTrackers();
    };

    // This component monitors window size. For every change it will fetch the
    // trackers. The fetch trackers function will only fetch trackers that fit
    // in the viewport, which means the view will update to fit.
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [fetchTrackers, resetPaging]);

  return (
    <div className="processing__container">
      <div className="processing__header-container">
        <IconHeader icon="play" text="Processing" />
        <input
          className="border"
          placeholder="Search..."
          value={searchCriteria}
          onChange={onHandleSearchChange}
        />
        <ProcessingSearchHelp />
      </div>
      <PanelGroup direction="column">
        <ProcessingList
          streamTasksApi={streamTasksApi}
          onSelectionChanged={onSelectionChanged}
        />
        <ProcessingDetails
          tracker={selectedTracker}
          enableToggle={enableToggleSelected}
        />
      </PanelGroup>
    </div>
  );
};

export default ProcessingContainer;
