import React from 'react'

function Die(props) {
  return (
    <div 
        className={props.isHeld ? 'die isHeld' : 'die'}
        onClick={() => props.onClick(props.id)}
    >
        <h4>{props.value}</h4>
    </div>
  )
}

export default Die