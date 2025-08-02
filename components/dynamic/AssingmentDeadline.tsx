import React from 'react'

const AssingmentDeadline = ({deadline,date}:{deadline:Date,date:boolean}) => {
    
  return (
      <span>Due: {date ? 

        Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }).format(new Date(deadline)) :
        Intl.DateTimeFormat('en-US', {
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date(deadline))}
        
      
      </span>
  )
}

export default AssingmentDeadline
