import React from 'react'
import { CFooter } from '@coreui/react'

const TheFooter = () => {
  return (
    <CFooter fixed={false}>
      <div>
        <a href="#" target="_blank" rel="noopener noreferrer">All rights reserved</a>
        <span className="ml-1">&copy; 2020 AfriLabs.</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1"></span>
        <a href="#" target="_blank" rel="noopener noreferrer"></a>
      </div>
    </CFooter>
  )
}

export default React.memo(TheFooter)
