import { useReducer, useState, useEffect } from "react";
// import CKEditor from "react-ckeditor-component";
import { CKEditor } from "ckeditor4-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ImagePlugin from "@ckeditor/ckeditor5-image/src/image";

const Demo = () => {
  // const [editor, setEditor] = useState(null);
  // useEffect(() => {
  //   console.log(ClassicEditor.create);
  //   ClassicEditor.create()
  //     .then(editor => {
  //       console.log(editor);
  //       setEditor(editor);

  //       editor.on('fileUploadRequest', () => {
  //         console.log("fileUploadRequest");
  //       });
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });

  //   return () => {
  //     // 移除事件监听器
  //     if (editor) {
  //       editor.off('fileUploadRequest');
  //     }
  //   };
  // }, []);

  return (
    <div className="App">
      <h2>Using CKEditor 4 in React</h2>
      <CKEditor
        editorUrl="/ckeditor/ckeditor.js"
        config={{
          skin: "minimalist",
          extraPlugins: "emoji,image2,uploadimage,quicktable",
          removeButtons: "PasteFromWord",
          removePlugins: "elementspath,font,fontSize,image",
          removeDialogTabs: "image:advanced;link:advanced",
          toolbar: [
            ["Undo", "Redo"],
            ["Styles", "Format"],
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
            ["Maximize"],
            ["Scayt"],
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
        onChange={(e) => {
          const { editor } = e;
          const isDirty = editor.checkDirty();
          console.log(isDirty);
          console.log(e);
          console.log(editor);
        }}
        onFocus={() => console.log("TODO 外面的input框blur事件")}
        // add
        onDialogShow={(ev) => {
          // 入る時、ウップロードの画面にする。
          ev.data.parts?.tabs?.$?.children[1]?.click();
          const iframe = ev.data.parts.contents?.$?.querySelector("iframe.cke_dialog_ui_input_file");
          const input = iframe?.contentWindow.document.querySelector("input[type=file]");
          input?.setAttribute("accept", "image/*");
        }}
      />
    </div>
  );
};
export default Demo;
