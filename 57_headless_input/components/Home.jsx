import React, { useCallback, useEffect, useRef, useState } from "react";
import { useCounter } from "hooks/useIncrement";

const Home = () => {
  const { getIncrementProps, getDecrementProps, getCountProps } = useCounter();
  return (
    <div>
      <button {...getDecrementProps()}>-</button>
      <input {...getCountProps()}/>
      <button {...getIncrementProps()}>+</button>
    </div>
  );
};

export default Home;
