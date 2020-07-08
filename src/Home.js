import React, { useState, useEffect, useRef } from "react";
import GameOver from "./GameOver";
import Question from "./Question";
// import Questions from "./Questions";
import "./App.css";
import axios from "axios";

function Home() {
   const [questions, setQuestions] = useState([]);
   const [myTime, setMyTime] = useState(0);
   const [categories, setCategories] = useState([]);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [score, setScore] = useState(0);
   const [gameOver, setGameOver] = useState(false);
   const [showAnswers, setShowAnswers] = useState(false);
   const [joker, setJoker] = useState(1);
   const [usedJoker, setUsedJoker] = useState(false);
   //  const [difficulty, setDifficulty] = useState("easy");

   const categoryEl = useRef();
   //    const levelEl = useRef();

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
            }));
            //  .filter((question) => {
            //     return question.difficulty === difficulty;
            //  });
            console.log(questions);
            setQuestions(questions);
         });

      let time = 15;
      const countdownEl = document.getElementById("countdown");
      const timer = setInterval(updateCountdown, 1000);
      function updateCountdown() {
         let seconds = time % 60;

         countdownEl.innerHTML = `${seconds}`;
         time--;

         if (time === 0) {
            clearInterval(timer);
            setGameOver(true);
         }
         setMyTime(time);
      }

      //  function handleLevel(e) {
      //     e.preventDefault();
      //     axios
      //        .get("https://opentdb.com/api.php?amount=10&type=multiple", {
      //           params: {
      //              category: categoryEl.current.value,
      //           },
      //        })
      //        .then((res) => {
      //           const level = res.data.results.filter((question) => {
      //              return question.difficulty === difficulty;
      //           });
      //           console.log(questions);
      //           setDifficulty(level);
      //        });
      //  }
   }

   const handleAnswer = (answer) => {
      if (answer === questions[currentIndex].correct_answer) {
         if (!showAnswers) {
            setScore(score + 10);
            setShowAnswers(true);
            setGameOver(false);
            setMyTime(15);
         }
      } else {
         setGameOver(true);
      }
   };
   const handleNextQuestion = () => {
      setShowAnswers(false);
      setCurrentIndex(currentIndex + 1);
      setMyTime(100);
   };

   const handleJoker = (e) => {
      e.preventDefault();
      if (joker > 0 && usedJoker === false) {
      } else {
         setJoker(0);
         setUsedJoker(true);
      }
   };

   if (gameOver === true || questions[currentIndex] >= questions.length) {
      return <GameOver score={score} />;
   } else {
      return (
         <>
            <div className="container-fluid form-container col-12">
               <form className="form" onSubmit={handleSubmit}>
                  <div className="row col-12">
                     <div className="form-group col-xs-12 col-sm-12 col-md-12 col-lg-5 col-xl-6 padding">
                        <label htmlFor="category">Category :</label>
                        <br />
                        <select
                           placeholder="Category"
                           className="btn btn-primary dropdown-toggle rounded-pill"
                           id="category"
                           ref={categoryEl}
                        >
                           {categories.map((category) => {
                              return (
                                 <option value={category.id} key={category.id}>
                                    {category.name}
                                 </option>
                              );
                           })}
                        </select>
                     </div>

                     {/* <form className="form" onSubmit={handleLevel}> */}
                     {/* <div className="form-group">
               <label htmlFor="category">Level</label>
               <select id="category" ref={levelEl}>
               <option value="easy">Easy</option>
               <option value="medium">Medium</option>
               <option value="hard">Hard</option>
               </select>
              </div> */}

                     <div className="form-group col-xs-2 col-sm-6 col-md-6 col-lg-5 col-xl-4 padding">
                        <label htmlFor="joker">Joker :</label>
                        <p>
                           <button
                              className="btn btn-info rounded-pill"
                              onClick={handleJoker}
                           >
                              50% JOKER
                           </button>
                        </p>
                     </div>
                     <div className="form-group col-xs-2 col-sm-6 col-md-6 col-lg-2 col-xl-2 padding">
                        <label htmlFor="time">Time Left : </label>
                        <p id="countdown">{myTime}</p>
                     </div>

                     <div className="submit-btn col-xs-12  col-sm-12 col-md-12 col-lg-2 col-xl-6 float-right padding">
                        <button className="btn btn-success btn-sm rounded-pill">
                           Start Game
                        </button>
                     </div>
                     {/* </form> */}
                  </div>
               </form>
            </div>

            <div className="container-fluid">
               {/* <Question
               data={questions[currentIndex]}
               //  answers={questions[currentIndex]}
               //  correct_answer={questions[currentIndex].correct_answer}
               handleAnswer={handleAnswer}
               handleNextQuestion={handleNextQuestion}
               showAnswers={showAnswers}
            /> */}

               {questions[currentIndex] !== undefined && (
                  <Question
                     data={questions[currentIndex]}
                     key={questions[currentIndex].id}
                     handleAnswer={handleAnswer}
                     handleNextQuestion={handleNextQuestion}
                     showAnswers={showAnswers}
                     joker={joker}
                     usedJoker={usedJoker}
                  />
               )}
            </div>
         </>
      );
   }
}

export default Home;
