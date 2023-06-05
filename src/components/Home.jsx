import { useReducer, useState, useEffect } from "react";
// import CKEditor from "react-ckeditor-component";
import { CKEditor } from "ckeditor4-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
// import ImagePlugin from "@ckeditor/ckeditor5-image/src/image";

const Demo = () => {
  const [editor, setEditor] = useState(null);
  const nav = useNavigate();

  return (
    <div className="App">
      <h2>Using CKEditor 4 in React</h2>
      <button
        onClick={() => nav("/childTest", { state: { threadId: "111111111" } })}
      >
        go childTest
      </button>
      <button
        onClick={() => {
          console.log(editor.getData());
          console.log(editor.insertHtml("111111"));
        }}
      >
        插入
      </button>
    </div>
  );
};
export default Demo;
