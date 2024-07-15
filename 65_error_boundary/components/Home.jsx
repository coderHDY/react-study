import React from "react";

const Home = () => {
  const [age, setAge] = React.useState(0);
  const getData = () => {
    try {
      const json = "{age: 20}"; // api/localstorage error json
      const data = JSON.parse(json); // throw error
      return data;
    } catch (error) {
      // 发送记录本模块错误日志
      console.log("error", error);
      return {
        age: -1, // 返回指定类型不会引起其他模块异常执行
      };
    }
  };

  const getAge = () => {
    const d = getData(); // throw error
    setAge(d.age);
  };

  return (
    <div>
      <h1>{age}</h1>
      <button onClick={getAge}>error</button>
    </div>
  );
};

export default Home;
