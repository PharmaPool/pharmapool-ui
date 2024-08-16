import React from "react";

function SpinLoader({ color }) {
  return (
    <div>
      <span className={color ? "load" : "loade"}></span>
    </div>
  );
}

export default SpinLoader;
