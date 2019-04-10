import * as React from "react";

import ROExpressionTerm from "./ROExpressionTerm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  ExpressionOperatorType,
  ExpressionTermType,
  ExpressionItem,
} from "./types";

interface Props {
  operator: ExpressionOperatorType;
  isRoot?: boolean;
  isEnabled: boolean;
}

/**
 * Read only expression operator
 */
const ROExpressionOperator: React.FunctionComponent<Props> = ({
  operator,
  isRoot,
  isEnabled,
}) => {
  let className = "expression-item expression-item--readonly";
  if (isRoot) {
    className += " expression-item__root";
  }
  if (!isEnabled) {
    className += " expression-item--disabled";
  }

  return (
    <div className={className}>
      <div>
        <span>
          <FontAwesomeIcon icon="circle" />
        </span>
        <span>{operator.op}</span>
      </div>
      <div className="operator__children">
        {operator.children &&
          operator.children
            .map((c: ExpressionItem, i) => {
              let itemElement;
              const cIsEnabled = isEnabled && c.enabled;
              switch (c.type) {
                case "term":
                  itemElement = (
                    <div key={i}>
                      <ROExpressionTerm
                        isEnabled={cIsEnabled}
                        term={c as ExpressionTermType}
                      />
                    </div>
                  );
                  break;
                case "operator":
                  itemElement = (
                    <ROExpressionOperator
                      isEnabled={cIsEnabled}
                      operator={c as ExpressionOperatorType}
                    />
                  );
                  break;
                default:
                  throw new Error(`Invalid operator type: ${c.type}`);
              }

              // Wrap it with a line to
              return <div key={i}>{itemElement}</div>;
            })
            .filter(c => !!c) // null filter
        }
      </div>
    </div>
  );
};

export default ROExpressionOperator;
