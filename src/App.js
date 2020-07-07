import React, { useState, useEffect, useRef } from "react";
import Question from "./Question";
// import Questions from "./Questions";
import "./App.css";
import axios from "axios";

function App() {
   const [questions, setQuestions] = useState([]);
   const [categories, setCategories] = useState([]);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [score, setScore] = useState(0);
   const [gameOver, setGameOver] = useState(false);
   const [showAnswers, setShowAnswers] = useState(false);

   const categoryEl = useRef();

   useEffect(() => {
      axios.get("https://opentdb.com/api_category.php").then((res) => {
         setCategories(res.data.trivia_categories);
      });
   }, []);

   //  function decodeString(str) {
   //     const textArea = document.createElement("textarea");
   //     textArea.innerHTML = str;
   //     return textArea.value;
   //  }

   function handleSubmit(e) {
      e.preventDefault();
      axios
         .get("https://opentdb.com/api.php?amount=10&type=multiple", {
            params: {
               category: categoryEl.current.value,
            },
         })
         .then((res) => {
            const questions = res.data.results.map((question) => ({
               ...question,
               answers: [
                  question.correct_answer,
                  ...question.incorrect_answers,
               ].sort(() => Math.random() - 0.5),
               singleQuestion: question.question,
            }));
            setQuestions(questions);
         });
   }

   const handleAnswer = (clicked) => {
      if (clicked === questions[currentIndex].correct_answer) {
         if (!showAnswers) {
            setScore(score + 10);
            setShowAnswers(true);
         }
      } else {
         setGameOver(true);
      }
   };
   const handleNextQuestion = () => {
      setShowAnswers(false);
      setCurrentIndex(currentIndex + 1);
   };

   return (
      <>
         <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
               <label htmlFor="category">Category</label>
               <select id="category" ref={categoryEl}>
                  {categories.map((category) => {
                     return (
                        <option value={category.id} key={category.id}>
                           {category.name}
                        </option>
                     );
                  })}
               </select>
            </div>

            <div className="form-group">
               <button className="btn btn-primary">Generate</button>
            </div>
         </form>
         <div className="container-fluid">
            {/* <Question
               question={questions[currentIndex].question}
               answers={questions[currentIndex].answers}
               correct_answer={questions[currentIndex].correct_answer}
               handleAnswer={handleAnswer}
               handleNextQuestion={handleNextQuestion}
            /> */}
            {questions.map((question) => {
               return (
                  <Question
                     data={questions[currentIndex]}
                     key={questions[currentIndex].id}
                     handleAnswer={handleAnswer}
                     handleNextQuestion={handleNextQuestion}
                     showAnswers={showAnswers}
                  />
               );
            })}
         </div>
      </>
   );
}

export default App;
