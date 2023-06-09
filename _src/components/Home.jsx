import { useReducer, useState, useEffect } from "react";
// import CKEditor from "react-ckeditor-component";
import { CKEditor } from "ckeditor4-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useLocation, useNavigate } from "react-router-dom";
// import ImagePlugin from "@ckeditor/ckeditor5-image/src/image";

const Demo = () => {
  const [timer, setTimer] = useState(null);
  const nav = useNavigate();
  // const locationState = window.history.state.usr;
  const location = useLocation();
  console.log(location);
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("发送邮件", location.state?.html, location.search);
      location.state = null;
      location.search = "";
      console.log("发送邮件后", location);
    }, 5000);
    setTimer(timer);
  }, []);

  return (
    <div className="App">
      <h2>Home</h2>
      <button onClick={() => nav("/nav", { state: { threadId: "111111111" } })}>
        go sender
      </button>
      <button onClick={() => clearTimeout(timer)}>取消发送</button>
    </div>
  );
};
export default Demo;
