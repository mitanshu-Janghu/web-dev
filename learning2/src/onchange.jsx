import React, { useState } from 'react'

const Onchange = () => {
  const [name, setName] = useState("")

  return (
    <>
      <input 
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h1>Hello {name}</h1>
      <button onClick={()=>setName("")}>clear</button>
    </>
  )
}

export default Onchange