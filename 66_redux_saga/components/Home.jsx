import React from "react";
import { useDispatch } from "react-redux";

const Home = () => {
  const [age, setAge] = React.useState(0);
  const dispatch = useDispatch();
  const addAge = () => {
    dispatch({ type: "USER_FETCH_REQUESTED", payload: { userId: 1 } });
    setAge(age + 1);
  };

  return (
    <div>
      <h1>{age}</h1>
      <button onClick={addAge}>+</button>
    </div>
  );
};

export default Home;
