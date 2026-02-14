import React, { useState } from 'react'
 

const State = () => {
const [x,y]=useState("hi");
function change(){
   if(x=='hi') {y("bye");}
   if(x=='bye') {y("hi");}
}
  return (
    <>
    <h1>{x}</h1>
    <button onClick={change}>😶‍🌫️</button>
    </>
  )
}

export default State