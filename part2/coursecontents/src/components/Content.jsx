import React from 'react'
import Part from './Part'
import Total from './Total'

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)} 
    <Total sum={parts.reduce((carry, part) => carry + part.exercises, 0)}/> 
  </>

export default Content