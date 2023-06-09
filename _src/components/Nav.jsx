import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const Nav = () => {
  const [html, setHtml] = useState("");
  const nav = useNavigate();

  const sendMail = () => {
    console.log("五秒后发", html);

    let state = {
      html,
      isSend: true,
    };

    nav("/home?sending=true", { state });
  };

  return (
    <div className="App">
      <h2>send</h2>
      <button onClick={sendMail}>go home</button>
      <input
        type="text"
        value={html}
        onChange={(e) => setHtml(e.target.value)}
      />
    </div>
  );
};

export default Nav;
