import React from "react";
import trivia from "./trivia3.jpg";
import { Link } from "react-router-dom";
import "./Welcome.css";

export default function Welcome() {
   return (
      <div className="card welcome-card col-6 mx-auto rounded">
         <div className="row mx-auto ">
            <div className="trivia-img-body col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 mx-auto">
               <img className="rounded-pill" src={trivia} alt="trivia" />
            </div>
            <div className="card-body trivia-body ">
               <h5 className="card-title">TRIVIA GAME</h5>
               <p className="card-text">
                  Have fun challenging your friends and enemies in the hottest
                  trivia game!
               </p>
               <Link to="/home">
                  <button className="btn btn-warning btn-lg rounded-pill">
                     Start Playing
                  </button>
               </Link>
            </div>
         </div>
      </div>
   );
}
