import { useState } from "react";
import { toast } from "react-toastify";

const useWord = (solution) => {
  const [turn, setTurn] = useState(0);
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...Array(6)]);
  const [history, setHistory] = useState([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [count, setCount] = useState(0);
  const [startTime, setStartTime] = useState(0);

  const formatGuess = () => {
    let solutionArray = [...solution];
    let formattedGuess = [...currentGuess].map((l) => {
      return { key: l, color: "grey" };
    });
    formattedGuess.forEach((l, i) => {
      if (solution[i] === l.key.toLowerCase()) {
        formattedGuess[i].color = "green";
        solutionArray[i] = null;
      }
    });

    formattedGuess.forEach((l, i) => {
      if (solutionArray.includes(l.key.toLowerCase()) && l.color !== "green") {
        formattedGuess[i].color = "yellow";
        solutionArray[solutionArray.indexOf(l.key)] = null;
      }
    });

    return formattedGuess;
  };

  const addNewGuess = (formattedGuess) => {
    if (currentGuess === solution) {
      setIsCorrect(true);
    }
    setGuesses((prevGuesses) => {
      let newGuesses = [...prevGuesses];
      newGuesses[turn] = formattedGuess;
      return newGuesses;
    });
    setHistory((prevHistory) => {
      return [...prevHistory, currentGuess];
    });
    setTurn((prevTurn) => {
      return prevTurn + 1;
    });
    setCurrentGuess("");
  };

  const handleKeyup = ({ key }) => {
    let solutionArray = [...solution];
    if(count===0){
      setCount(1);
      setStartTime(Math.floor(new Date().getTime() / 1000));
    }
    if (key === "Enter") {
      if (turn > 5) {
        toast.error("You used all your guesses!");
        return;
      }
      if (history.includes(currentGuess)) {
        toast.error("You already tried that word.");
        return;
      }
      if (currentGuess.length !== solutionArray.length) {
        toast.error("Word must be same as blocks size.");
        return;
      }
      const formatted = formatGuess();
      addNewGuess(formatted);
    }
    if (key === "Backspace") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < solutionArray.length) {
        setCurrentGuess((prev) => prev + key);
      }
    }
  };

  return { turn, currentGuess, guesses, isCorrect, handleKeyup, startTime };
};

export default useWord;
