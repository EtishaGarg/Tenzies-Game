import './App.css';
import Die from './components/Die';
import React from 'react'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue){
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])


  function allNewDice() {
    const newDice = []
    for(let i=0; i<10; i++){
      newDice.push({
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  function holdDice(id) {
    setDice(prevDice => prevDice.map(dice => {
          return dice.id===id ? {...dice, isHeld: !dice.isHeld} : dice
    }))
  }

  const diceElements = dice.map(die => {
    return(
      <Die 
        key={die.id} 
        id= {die.id}
        value={die.value} 
        isHeld={die.isHeld} 
        onClick={holdDice}/>
    )
  })

  function rollDice() {
    setDice(prevDice => prevDice.map(dice => {
      return dice.isHeld ? dice : {...dice, id : nanoid(), value: Math.ceil(Math.random() * 6)}
    }))
  }

  function resetGame(){
    setDice(allNewDice())
    setTenzies(false)
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at it's current value between rolls.</p>
      <div className='container'>
        {diceElements}
        {!tenzies ? 
          <button className='roll-button' onClick={rollDice}>Roll</button>
          :
          <button className='roll-button reset' onClick={resetGame}>Reset Game</button>
        }
        
      </div>
      
    </main>
  );
}

export default App;
