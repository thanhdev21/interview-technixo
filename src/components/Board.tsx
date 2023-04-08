import React, { useEffect, useState } from "react";
import "./Board.css";
import Cell from "./Cell";
interface ICard {
  id: number;
  type: string;
}
const Board: React.FC = () => {
  // states...
  const [flipped, setFlipped] = useState<number[]>([]);
  const [cards, setCards] = useState<Array<ICard>>([]);
  const [solved, setSolved] = useState<Array<ICard>>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [flips, setFlips] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(100);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [intervalId, setIntervalId] = useState<number | undefined>(undefined);
  const [victory, setVictory] = useState<boolean>(false);

  const shuffle = (array: ICard[]) => {
    const _array = array.slice(0);
    for (let i = 0; i < array.length - 1; i++) {
      let randomIndex = Math.floor(Math.random() * (i + 1));
      let temp = _array[i];
      _array[i] = _array[randomIndex];
      _array[randomIndex] = temp;
    }

    return _array;
  };

  const initDeck = () => {
    let id = 0;
    let cards = [];

    cards = [
      "red",
      "yellow",
      "purple",
      "green",
      "grey",
      "pink",
      "brown",
      "blue",
    ].reduce((acc: any, type) => {
      acc.push({
        id: id++,
        type,
      });
      acc.push({
        id: id++,
        type,
      });
      return acc;
    }, []);

    return shuffle(cards);
  };

  useEffect(
    () => {
      setCards(initDeck());
    },
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    if (solved.length === 16) {
      alert("You lose!!!");
      setIsRunning(false);
      setVictory(true);
    }
    // eslint-disable-next-line
  }, [solved]);

  useEffect(() => {
    if (seconds === 0) {
      setIsRunning(false);
      if (solved.length !== 16) {
        setVictory(false);
        alert("You lose!!!");
      }
    }
    // eslint-disable-next-line
  }, [seconds]);

  useEffect(() => {
    if (isRunning) {
      const id: number = window.setInterval(
        () => setSeconds((seconds) => seconds - 1),
        1000
      );
      setIntervalId(id);
    } else {
      window.clearInterval(intervalId);
    }
    // eslint-disable-next-line
  }, [isRunning]);

  const onClick = (id: any) => {
    setDisabled(true);

    // If no cards flipped
    if (flipped.length === 0) {
      if (!sameCardClicked(id)) {
        setFlips((flips) => flips + 1);
      }
      setFlipped([id]);
      setDisabled(false);
      // At least flipped one
    } else {
      if (!sameCardClicked(id)) {
        setFlips((flips) => flips + 1);
      }

      if (sameCardClicked(id)) {
        setDisabled(false);
        return;
      }
      setFlipped([flipped[0], id]);
      if (isMatch(id)) {
        setSolved([...solved, flipped[0], id]);
        setFlipped([]);
        setDisabled(false);
      } else {
        setTimeout(() => {
          setFlipped([]);
          setDisabled(false);
        }, 2000);
      }
    }
  };

  const sameCardClicked = (id: number) => {
    return flipped.includes(id);
  };

  const isMatch = (id: number) => {
    const clickedCard = cards.find((card: any) => card.id === id);
    const flippedCard = cards.find((card: any) => flipped[0] === card.id);
    return flippedCard?.type === clickedCard?.type;
  };

  const playAgain = () => {
    setFlipped([]);
    setCards(initDeck());
    setSolved([]);
    setDisabled(false);
    setFlips(0);
    setSeconds(100);
    setIsRunning(true);
  };

  useEffect(() => {
    if (victory) {
      alert("You win!!! Play again?");
    }
  }, [victory]);

  return (
    <div className="game-container">
      <div className="game-controller">
        <div className="mr-5">
          {victory ||
            (seconds === 0 && (
              <div>
                Game status:{" "}
                {victory ? "You win" : seconds === 0 ? "You lose" : ""}
              </div>
            ))}
        </div>
        <div className="mr-5">Time: {seconds} sec</div>
        <div className="mr-5">Card flipped: {flips}</div>
        <div>
          <button onClick={playAgain}>Play Again</button>
        </div>
      </div>

      <div className="board">
        {cards.map((card: any) => (
          <Cell
            key={card.id}
            id={card.id}
            type={card.type}
            width={130}
            height={180}
            flipped={flipped.includes(card.id)}
            solved={solved.includes(card.id)}
            onClick={onClick}
            disabled={disabled || solved.includes(card.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
