import React from 'react'

const StatisticLine = ({text, value}) => {
  return (    
    <tr>
      <td width={50}>{text}</td>
      <td>{value}</td>  
    </tr>
    
  )
}

export default StatisticLine