import React, { useEffect, useState } from 'react';
import Die from './components/Die';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App(){
      const [dice, setDice] = useState(allNewDice());
      const [tenzies, setTenzies] = useState(false);

      useEffect(()=>{
        const allHeld = dice.every(die => die.isHeld);
        const firstValue = dice[0].value;
        const allSameValue = dice.every(die => die.value === firstValue)
        
        if(allHeld && allSameValue){
          setTenzies(true)
        }
          
      },[dice])

      function generateNewDie(){
        return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }

      }
      function holdDice(id){
        setDice(prevDice => prevDice.map(die => {
          return die.id === id ? 
              {...die, isHeld: !die.isHeld} : die 
        }))
      }

      function handleClick(){
        if(!tenzies){
          setDice(prevDice=> prevDice.map(die => {
            return die.isHeld ? die : generateNewDie()
          }))
        }
        else{
          setTenzies(false);
          setDice(allNewDice());
        }
      }


      function allNewDice() {
        const newDice = [];
        for(let i = 0; i < 10; i++){
          newDice.push(generateNewDie());
        }
        return newDice
      }

      const diceElements = dice.map((die)=>{
        return (
            <Die 
              key={die.id}
              value={die.value}
              isHeld={die.isHeld}
              holdDice={() => holdDice(die.id)}
            />
        )
      })
    const buttonTxt = tenzies ? "New Game" : "Roll";
    
  return(
    <main className="bg">
        <div className="main">
          <h1>Tenzies</h1>
              <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
              {tenzies && 
              <div> 
                <Confetti/> 
                <h1>You Won!</h1>
              </div>}
              

              <div className="dice-sec">
                  {diceElements}
              </div>
              <button 
                onClick={handleClick} 
                className= "roll">
                  {buttonTxt}
              </button>
        </div>
    </main>
  )
}