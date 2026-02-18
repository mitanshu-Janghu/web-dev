import React from 'react'
import Photo from './photo.jsx'
import Built from './built.jsx'
import Button from './button.jsx'
import State from './State.jsx'
import Count from './Count.jsx'
import Props from './Props.jsx'
import Onchange from './onchange.jsx'
const Apple = () => {
  return (
    <div>To do</div>
  )
}
let name="legend";
const App = () => {
  return (
    <>
   <h1><Apple/></h1> 
    <Photo/>
    <Built/>
    <Button/>
    <State/>
    <Count/>
    <Onchange/>
    <Props name={name}/>
    
    </>
  )
}
export default App


