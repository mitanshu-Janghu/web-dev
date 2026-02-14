import React from 'react'

function onclick(){
    alert("hi ; how are you");
}
const Button = () => {
  return (<>
    <button onClick={onclick}> click </button>
</>
  )
}

export default Button