import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./QuizPage.css";
import { Link } from "react-router-dom";

const QuizPage = () => {
  const location = useLocation();
  const { difficulty } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const generateQuestions = () => {
    const generatedQuestions = [];
    for (let i = 0; i < 10; i++) {
      let num1, num2;
      if (difficulty === "easy") {
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
      } else if (difficulty === "medium") {
        num1 = Math.floor(Math.random() * 90) + 10;
        num2 = Math.floor(Math.random() * 90) + 10;
      } else if (difficulty === "hard") {
        num1 = Math.floor(Math.random() * 900) + 100;
        num2 = Math.floor(Math.random() * 900) + 100;
      }

      const operator = Math.random();
      let operatorSymbol;
      let answer;

      if (operator < 0.25) {
        operatorSymbol = "+";
        answer = num1 + num2;
      } else if (operator < 0.5) {
        operatorSymbol = "-";
        answer = num1 - num2;
      } else if (operator < 0.75) {
        operatorSymbol = "*";
        answer = num1 * num2;
      } else {
        num2 = num2 === 0 ? 1 : num2;
        operatorSymbol = "/";
        answer = Math.floor(num1 / num2);
      }
      const options = [];
      while (options.length < 3) {
        let randomNum = Math.floor(Math.random() * 1000);
        if (!options.includes(randomNum) && randomNum !== answer) {
          options.push(randomNum);
        }
      }
      options.push(answer);
      options.sort(() => Math.random() - 0.5);
      generatedQuestions.push({
        question: `${num1} ${operatorSymbol} ${num2}`,
        options: options,
        correctAnswer: answer,
      });
    }
    setQuestions(generatedQuestions);
    setCurrentQuestionIndex(0);
    setScore(0);
    setUserAnswers([]);
    setQuizCompleted(false);
  };

  useEffect(() => {
    generateQuestions();
  }, [difficulty]);

  const handleAnswerSelection = (answer) => {
    if (currentQuestionIndex < questions.length) {
      setUserAnswers([...userAnswers, answer]);
      if (answer === questions[currentQuestionIndex]?.correctAnswer) {
        setScore(score + 1);
      }
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setQuizCompleted(true);
      }
    }
  };

  if (quizCompleted) {
    return (
      <div className="quiz-results">
        <h2>Quiz Completed!</h2>
        <div className="quiz-results-content">
          <p>
            Your score: {score} out of {questions.length}
          </p>
          <p>{score >= questions.length / 2 ? "You passed!" : "You failed!"}</p>
          <Link to="/">
            <button>Back to StartPage</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h2>Quiz - Difficulty: {difficulty}</h2>
      {questions.length > currentQuestionIndex && (
        <div className="quiz-content">
          <p className="quiz-question">
            {questions[currentQuestionIndex]?.question}
          </p>
          <div className="quiz-options">
            {questions[currentQuestionIndex]?.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelection(option)}
                className={`option-button`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
