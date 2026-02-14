import React, { useState } from 'react'

const Count = () => {
    const [x,y]=useState(0);
  return (<>
    <div>Count : {x}</div>
    <button onClick={()=>y(x+1)}> add </button>
    <button onClick={()=>y(0)}> zero </button>
</>  )
}

export default Count