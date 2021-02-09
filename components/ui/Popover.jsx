import React, { Fragment, useMemo } from 'react'
import isArray from 'lodash/isArray'
import { Popover as TinyPopover } from 'react-tiny-popover'

import useOuterClick from 'utils/hooks/useOuterClick'

const Popover = ({ isOpen, handleClose, content, actions, children }) => {
  const innerRef = useOuterClick(() => isOpen ? handleClose() : null)

  const renderActions = () => {
    if (isArray(actions)) {
      return actions.map((action, index) => <Fragment key={`popover-${index}`}>{action}</Fragment>)
    }

    return actions
  }

  const popover = useMemo(() => (
    <TinyPopover
      ref={innerRef}
      isOpen={isOpen}
      containerClassName="z-50 bg-white shadow p-4 rounded-lg w-64"
      content={
        <div className="flex flex-col justify-between">
          <div className="mb-4 text-center">
            {typeof content === "string"
              ? <p>{content}</p>
              : content
            }
          </div>
          {actions &&
            <div className="flex justify-around">
              {renderActions()}
            </div>
          }
        </div>
      }
    >
      {children}
    </TinyPopover>
  ), [isOpen, handleClose, actions, content, children])

  return popover
}

export default Popover
