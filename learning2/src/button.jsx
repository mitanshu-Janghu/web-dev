import React from 'react'
import style from './button.module.css'
function onclick(){
    alert("hi ; how are you");
}
const Button = () => {
  return (<>
    <button className={style.heading}  onClick={onclick}> click </button>
</>
  )
}

export default Button