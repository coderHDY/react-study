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
      <button onClick={() => nav("/childTest", {state: {threadId: "111111111"}})}>go childTest</button>
      <CKEditor
        editorUrl="/ckeditor/ckeditor.js"
        config={{
          skin: "minimalist",
          placeholder: `请填写内容`,
          extraPlugins:
            "emoji,image2,uploadimage,quicktable,colorbutton,colordialog,confighelper",
          removeButtons: "PasteFromWord,PasteFromWord",
          removePlugins: "elementspath,font,fontSize,image",
          removeDialogTabs: "image:advanced;link:advanced",
          toolbar: [
            ["Undo", "Redo"],
            ["Styles", "Format"],
            ["TextColor", "BGColor"],
            ["Bold", "Italic", "Underline", "Strike", "-", "RemoveFormat"],
            [
              "NumberedList",
              "BulletedList",
              "-",
              "Outdent",
              "Indent",
              "-",
              "Blockquote",
            ],
            ["Link", "Unlink"],
            ["Image", "Table", "EmojiPanel"],
          ],
          // 必要的url
          // filebrowserUploadUrl:
          //   "/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files",
          // uploadUrl:
          //   "/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json",
          filebrowserUploadUrl:
            "https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files",
          uploadUrl:
            "https://ckeditor.com/apps/ckfinder/3.4.5/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json",
          uploadImage_supportedTypes: /image\/(png|jpeg)/,
        }}
        onFileUploadRequest={(editor) => {
          // 替换后端api接口代码
          // editor.data.requestData.file = editor.data.requestData.upload;
          // delete editor.data.requestData.upload;
          // console.log(editor);
        }}
        onFileUploadResponse={(evt) => {
          // TODO 添加到添附文件里面去
          console.log(evt);
          // Prevent the default response handler.
          evt.stop();

          evt.data.url = "http://baidu.com";
        }}
        onDialogHide={(evt) => {
          evt.stop();
        }}
        onFocus={() => console.log("TODO 外面的input框blur事件")}
        // add
        onDialogShow={(ev) => {
          // 入る時、ウップロードの画面にする。
          ev.data.parts?.tabs?.$?.children[1]?.click();
          const iframe = ev.data.parts.contents?.$?.querySelector(
            "iframe.cke_dialog_ui_input_file"
          );
          const input =
            iframe?.contentWindow.document.querySelector("input[type=file]");
          input?.setAttribute("accept", "image/*");
        }}
      />
    </div>
  );
};
export default Demo;
