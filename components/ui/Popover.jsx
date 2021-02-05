import React, { Fragment } from 'react'
import isArray from 'lodash/isArray'
import { Popover as TinyPopover} from 'react-tiny-popover'

const Popover = ({ isOpen, content, actions, children }) => {
  const renderActions = () => {
    if (isArray(actions)) {
      return actions.map((action, index) => <Fragment key={`popover-${index}`}>{action}</Fragment>)
    }

    return actions
  }

  return (
    <TinyPopover
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
  )
}

export default Popover
