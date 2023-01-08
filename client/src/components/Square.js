import React from "react";

function Square({ chooseSquare, val }) {
  return (
    <div
      className={val === "X" ? "square x" : "square o"}
      onClick={chooseSquare}
    >
      {val}
    </div>
  );
}

export default Square;
