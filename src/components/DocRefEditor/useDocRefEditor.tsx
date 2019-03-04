import { useMemo, useCallback } from "react";

import useReduxState from "../../lib/useReduxState";
import { StoreStateById, defaultStatePerId } from "./redux";
import { ButtonProps } from "../Button";
import { Props as DocRefEditorProps } from ".";
import { useActionCreators } from "./redux";

export interface Props<T extends object> {
  docRefUuid: string;
  saveDocument: (docRefContents: T) => void;
}

export interface OutProps<T extends object> {
  isDirty: boolean;
  isSaving: boolean;
  docRefContents?: T;
  editorProps: DocRefEditorProps;
  onDocumentChange: (updates: Partial<T>) => void;
}

export function useDocRefEditor<T extends object>({
  docRefUuid,
  saveDocument
}: Props<T>): OutProps<T> {
  const { documentChangesMade } = useActionCreators();
  const { isDirty, isSaving, docRefContents }: StoreStateById = useReduxState(
    ({ docRefEditors }) => docRefEditors[docRefUuid] || defaultStatePerId,
    [docRefUuid]
  );

  const actionBarItems: Array<ButtonProps> = useMemo(() => {
    return [
      {
        icon: "save",
        disabled: !(isDirty || isSaving),
        title: isSaving ? "Saving..." : isDirty ? "Save" : "Saved",
        onClick: () => {
          if (!!docRefContents) {
            saveDocument((docRefContents as unknown) as T);
          }
        }
      }
    ] as Array<ButtonProps>;
  }, [isSaving, isDirty, docRefUuid, docRefContents, saveDocument]);

  return {
    isDirty,
    isSaving,
    docRefContents: !!docRefContents
      ? ((docRefContents as unknown) as T)
      : undefined,
    onDocumentChange: useCallback(
      (updates: Partial<T>) => documentChangesMade(docRefUuid, updates),
      [documentChangesMade, docRefUuid]
    ),
    editorProps: {
      actionBarItems,
      docRefUuid
    }
  };
}

export default useDocRefEditor;
