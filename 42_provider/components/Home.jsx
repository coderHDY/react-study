import react from "react";
import { useCount, useCountDispatch } from "hooks/useCountProvider";

const Home = () => {
  const count = useCount();
  const countDispatch = useCountDispatch();
  const addClick = () => {
    countDispatch({
      type: "add",
      num: 3,
    });
  };
  return (
    <div>
      {count}
      <button onClick={addClick}>+++</button>
    </div>
  );
};
export default Home;
