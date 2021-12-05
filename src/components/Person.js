import React from 'react'

const Person = ({ person }) => {
  return (
    <div className="card">
      <h3>{person.name}</h3>
      <p>性别 - {person.gender}</p>
      <p>生年 - {person.birth_year}</p>
    </div>
  )
}

export default Person
