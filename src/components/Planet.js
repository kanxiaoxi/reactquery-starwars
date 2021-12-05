import React from 'react'

const Planet = ({ planet }) => {
  return (
    <div className="card">
      <h3>{planet.name}</h3>
      <p>人数 - {planet.population}</p>
      <p>地形 - {planet.terrain}</p>
    </div>
  )
}

export default Planet
