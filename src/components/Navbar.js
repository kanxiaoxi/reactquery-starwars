import React from 'react'

const Navbar = ({ setPage }) => {
  return (
    <nav>
      <button onClick={() => setPage("planets")}>星球</button>
      <button onClick={() => setPage("people")}>人物</button>
    </nav>
  )
}

export default Navbar
