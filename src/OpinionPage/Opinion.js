import React from "react";

export const Opinion = (props) => {
  console.log("Hi from opinion", props);
  return (
    <div>
      <h2>{props.opinion.title}</h2>
      <p>{props.opinion.content}</p>
      <button>Disagree</button>
      <button>Agree</button>
    </div>
  );
};
