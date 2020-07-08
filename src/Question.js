import React from "react";
import "./Question.css";

const Question = ({
   data: { question, answers, correct_answer },
   handleAnswer,
   handleNextQuestion,
   showAnswers,
}) => {
   return (
      <>
         <div className="row question-answers">
            <div className="card mx-auto col-xs-12 col-sm-12 col-md-10 col-lg-9 col-xl-8 padding-question ">
               <div className="card-body ">
                  <h6 className="card-title">
                     <strong>Question:</strong>{" "}
                  </h6>
                  <h7
                     className="card-text"
                     dangerouslySetInnerHTML={{ __html: question }}
                  />
               </div>
            </div>

            <div className="options mx-auto col-xs-12 col-sm-12 col-md-10 col-lg-9 col-xl-8 ">
               {answers.map((answer) => {
                  const bgColor = showAnswers
                     ? answer === correct_answer
                        ? "btn btn-success"
                        : "btn btn-danger disabled"
                     : "btn btn-outline-dark ";

                  return (
                     <button
                        type="button"
                        id="questBtn"
                        className={` ${bgColor} questionBtn  btn btn-outline-dark col-12 padding-answers`}
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
