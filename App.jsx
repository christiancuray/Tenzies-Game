import { useState, useRef, useEffect } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  // State values
  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);

  // check if all dice are held and have the same value to determine if the game is won
  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  // id game is done, focus on the button so we can use spacebar to start a new game
  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]); // dependency, if gameWon changes, run the effect

  // Function to generate 10 new dice with random values ranged from 1 to 6
  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(), // generate a unique id for each die
    }));
  }

  // Function to roll the dice, if the dice is held, keep the value, otherwise generate a new random value.
  // If the game is won, and the button is clicked, start a new game by generating 10 new dice.
  function rollDice() {
    if (!gameWon) {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(generateAllNewDice());
    }
  }

  // Function to hold the dice, if the die is clicked, flip the isHeld value, if not, keep the value.
  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  // Map the dice array to Dice components and pass the value, isHeld and hold function as props
  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ));

  return (
    <main>
      {gameWon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
