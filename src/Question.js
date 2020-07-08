import React from "react";
import "./Question.css";

const Question = ({
   data: { question, answers, correct_answer },
   handleAnswer,
   handleNextQuestion,
   showAnswers,
   joker,
   usedJoker,
}) => {
   return (
      <>
         <div className="row question-answers">
            <div className="card mx-auto col-xs-12 col-sm-12 col-md-10 col-lg-9 col-xl-8 padding ">
               <div className="card-body ">
                  <h6 className="card-title">Question:</h6>
                  <h7
                     className="card-text"
                     dangerouslySetInnerHTML={{ __html: question }}
                  />
               </div>
            </div>

            <div className="options mx-auto col-xs-12 col-sm-12 col-md-10 col-lg-9 col-xl-8 padding ">
               {answers.map((answer) => {
                  const bgColor = showAnswers
                     ? answer === correct_answer
                        ? "btn btn-success"
                        : "btn btn-danger "
                     : "btn btn-outline-dark ";

                  const jokerUsed = usedJoker
                     ? (answer.incorrect_answers[0] =
                          "btn btn-warning rounded-pill")
                     : "btn btn-outline-dark";

                  return (
                     <button
                        type="button"
                        className={` ${bgColor} btn btn-outline-dark col-12 padding`}
                        onClick={() => handleAnswer(answer)}
                        dangerouslySetInnerHTML={{ __html: answer }}
                     />
                  );
               })}
               {showAnswers && (
                  <button
                     onClick={handleNextQuestion}
                     className="btn btn-warning btn-sm float-right padding"
                  >
                     Next Question
                  </button>
               )}
            </div>
         </div>
      </>
   );
};

export default Question;

// import React from "react";

// const Question = ({
//    data: { question, answers, correct_answer },
//    handleAnswer,
//    handleNextQuestion,
//    showAnswers,
// }) => {
//    const [flip, setFlip] = useState(false);
//    const [height, setHeight] = useState("initial");

//    const frontEl = useRef();
//    const backEl = useRef();

//    function setMaxHeight() {
//       const frontHeight = frontEl.current.getBoundingClientRect().height;
//       const backHeight = backEl.current.getBoundingClientRect().height;
//       setHeight(Math.max(frontHeight, backHeight, 100));
//    }

//    useEffect(setMaxHeight, [
//       question.question,
//       question.answer,
//       question.options,
//    ]);
//    useEffect(() => {
//       window.addEventListener("resize", setMaxHeight);
//       return () => window.removeEventListener("resize", setMaxHeight);
//    }, []);

//    return (
//       <>
//          <div className="card mx-auto col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 rounded">
//             <div className="card-body ">
//                <h5 className="card-title">Question:</h5>
//                <h4
//                   className="card-text"
//                   dangerouslySetInnerHTML={{ __html: question }}
//                />
//             </div>
//          </div>

//          <div className="options mx-auto col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
//             {answers.map((answer) => {
//                const bgColor = showAnswers
//                   ? answer === correct_answer
//                      ? "btn btn-success"
//                      : "btn btn-danger"
//                   : "btn btn-outline-dark";

//                return (
//                   <button
//                      type="button"
//                      className={` ${bgColor} btn btn-outline-dark col-12 padding`}
//                      onClick={() => handleAnswer(answer)}
//                      dangerouslySetInnerHTML={{ __html: answer }}
//                   />
//                );
//             })}

//             {showAnswers && (
//                <button
//                   onClick={handleNextQuestion}
//                   className="btn btn-warning btn-lg float-right"
//                >
//                   Next Question
//                </button>
//             )}
//          </div>
//       </>
//   <div
//      className={`card ${flip ? "flip" : ""}`}
//      style={{ height: height }}
//      onClick={() => setFlip(!flip)}
//   >
//      <div className="front" ref={frontEl}>
//         {question.question}
//         <div className="flashcard-options">
//            {question.options.map((option) => {
//               return (
//                  <div className="flashcard-option" key={option}>
//                     {option}
//                  </div>
//               );
//            })}
//         </div>
//      </div>
//      <div className="back" ref={backEl}>
//         {question.answer}
//      </div>
//   </div>
//    );
// };

// export default Question;
