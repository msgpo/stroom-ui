import * as React from "react";
import { pipe } from "ramda";
import { RenderFunction } from "@storybook/react";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import StoryRouter from "storybook-react-router";
import * as ReactModal from "react-modal";

import { useTestServer } from "./PollyDecorator";

import useFontAwesome from "src/lib/useFontAwesome/useFontAwesome";
import testData from "../data";
import { ThemeContextProvider } from "src/lib/useTheme/useTheme";
import { withRouter, RouteComponentProps } from "react-router";
import { CustomRouter } from "src/lib/useRouter";
import { ConfigProvider } from "src/startup/config";
import { AuthorisationContextProvider } from "src/startup/Authorisation";
import { AuthenticationContext } from "src/startup/Authentication";
import { DocumentTreeContextProvider } from "src/components/DocumentEditors/api/explorer";
import { ErrorReportingContextProvider } from "src/components/ErrorPage";

const WithTestServer: React.FunctionComponent = ({ children }) => {
  useFontAwesome();
  useTestServer(testData);

  return <div>{children}</div>;
};

const RouteWrapper: React.StatelessComponent<RouteComponentProps> = ({
  children,
  history,
}) => {
  return (
    <CustomRouter history={history}>
      <WithTestServer>{children}</WithTestServer>
    </CustomRouter>
  );
};
const DragDropRouted = pipe(
  DragDropContext(HTML5Backend),
  withRouter,
)(RouteWrapper);

ReactModal.setAppElement("#root");

export default (storyFn: RenderFunction) =>
  StoryRouter()(() => (
    <ErrorReportingContextProvider>
      <ConfigProvider>
        <AuthenticationContext.Provider
          value={{
            idToken: "PollyWannaCracker",
            setIdToken: () => {
              console.error(
                "Setting the idToken in storybook? This is most unexpected!",
              );
            },
          }}
        >
          <AuthorisationContextProvider>
            <ThemeContextProvider>
              <DragDropRouted>
                <DocumentTreeContextProvider>
                  {storyFn()}
                </DocumentTreeContextProvider>
              </DragDropRouted>
            </ThemeContextProvider>
          </AuthorisationContextProvider>
        </AuthenticationContext.Provider>
      </ConfigProvider>
    </ErrorReportingContextProvider>
  ));
