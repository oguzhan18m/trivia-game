import React, { useState, useEffect, useRef } from "react";
import GameOver from "./GameOver";
import Question from "./Question";
import "./App.css";
import axios from "axios";
import correct_answer from "./correct_answer.wav";
import wrong_answer from "./wrong_answer.mp3";
import joker from "./joker.wav";

function Home() {
   const [questions, setQuestions] = useState([]);
   const [categories, setCategories] = useState([]);
   const [myTime, setMyTime] = useState(0);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [score, setScore] = useState(0);
   const [gameOver, setGameOver] = useState(false);
   const [showAnswers, setShowAnswers] = useState(false);
   const [usedJoker, setUsedJoker] = useState(false);
   const [timer, setTimer] = useState(null);

   const categoryEl = useRef();
   const levelEl = useRef();

   const timeLimitForAQuestion = 15;

   useEffect(() => {
      axios.get("https://opentdb.com/api_category.php").then((res) => {
         setCategories(res.data.trivia_categories);
      });
   }, []);

   function handleSubmit(e) {
      e.preventDefault();
      axios
         .get("https://opentdb.com/api.php?amount=10&type=multiple", {
            params: {
               category: categoryEl.current.value,
               difficulty: levelEl.current.value,
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
            console.log(questions);
            setQuestions(questions);
         });
      startTimerForQuestion();
   }

   const startTimerForQuestion = () => {
      let time = timeLimitForAQuestion;

      const countdownEl = document.getElementById("countdown");

      if (timer !== null) clearInterval(timer);
      setTimer(setInterval(updateCountdown, 1000));

      function updateCountdown() {
         let seconds = time % 60;

         countdownEl.innerHTML = `${seconds}`;

         if (time === 0) {
            clearInterval(timer);
            setGameOver(true);
         }

         setMyTime(time);
         time--;
      }
   };

   const handleAnswer = (answer) => {
      if (answer === questions[currentIndex].correct_answer) {
         if (!showAnswers) {
            setScore(score + 10);
            setShowAnswers(true);
            setGameOver(false);
         }
         document.getElementById("correct_answer").play();
      } else {
         wrongAudioPlay();
         setTimeout(() => {
            setGameOver(true);
         }, 500);
      }
   };

   const handleNextQuestion = () => {
      setShowAnswers(false);
      setCurrentIndex(currentIndex + 1);
      startTimerForQuestion();
   };

   const wrongAudio = document.getElementById("wrong-answer");

   function wrongAudioPlay() {
      wrongAudio.play();
   }

   const handleJoker = (e) => {
      e.preventDefault();

      if (usedJoker) {
         window.alert("You have already used your Joker");
         return;
      }
      document.getElementById("joker").play();

      // yanlış olan 2 seçenek silinecek
      e.target.className = e.target.className + " disabled";
      const quesButtons = document.getElementsByClassName("questionBtn");

      let removed = 0;
      for (let i = 0; i < quesButtons.length; i++) {
         if (
            quesButtons[i].textContent !==
               questions[currentIndex].correct_answer &&
            removed < 2
         ) {
            quesButtons[i].className = quesButtons[i].className + " disabled";
            ++removed;
         }
      }
      setUsedJoker(true);
   };

   if (gameOver === true || questions[currentIndex] >= questions.length) {
      return <GameOver score={score} />;
   } else {
      return (
         <>
            <>
               <audio id="correct_answer" src={correct_answer}></audio>
               <audio id="wrong-answer" src={wrong_answer}></audio>
               <audio id="joker" src={joker}></audio>
            </>
            <div className="container-fluid form-container col-12">
               <form className="form" onSubmit={handleSubmit}>
                  <div className="row col-12">
                     <div className="form-group col-xs-12 col-sm-6 col-md-6 col-lg-5 col-xl-6 padding">
                        <label htmlFor="category">Category :</label>
                        <br />
                        <select
                           placeholder="Category"
                           className="btn btn-primary dropdown-toggle rounded-pill btn-sm"
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
                     <div className="row col-12">
                        <div className="form-group col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 padding">
                           <label htmlFor="category">Level</label>
                           <br />
                           <select
                              className="btn btn-primary dropdown-toggle rounded-pill"
                              id="category"
                              ref={levelEl}
                           >
                              <option value="easy">Easy</option>
                              <option value="medium">Medium</option>
                              <option value="hard">Hard</option>
                           </select>
                        </div>

                        <div className="form-group col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6 padding">
                           <label htmlFor="joker">Joker :</label>
                           <p>
                              <button
                                 className="btn btn-info rounded btn-sm"
                                 onClick={handleJoker}
                              >
                                 50% JOKER
                              </button>
                           </p>
                        </div>
                     </div>
                     <div className="row col-12">
                        <div className="submit-btn col-xs-3  col-sm-6 col-md-6 col-lg-6 col-xl-6 float-left padding">
                           <button className="btn btn-success btn-sm rounded-pill">
                              Start Game
                           </button>
                        </div>
                        <div className="form-group col-xs-3 col-sm-6 col-md-6 col-lg-6 col-xl-6 padding">
                           <label htmlFor="time">Time Left : </label>
                           <p id="countdown">{myTime}</p>
                        </div>
                     </div>
                  </div>
               </form>
            </div>

            <div className="container-fluid">
               {questions[currentIndex] !== undefined && (
                  <Question
                     data={questions[currentIndex]}
                     key={questions[currentIndex].id}
                     handleAnswer={handleAnswer}
                     handleNextQuestion={handleNextQuestion}
                     showAnswers={showAnswers}
                  />
               )}
            </div>
         </>
      );
   }
}

export default Home;
