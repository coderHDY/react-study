import React, { useEffect, useRef, useState } from "react";

const jp2en = (s) => {
  const map = {
    あ: "a",
    い: "i",
    う: "u",
    え: "e",
    お: "o",
    ア: "a",
    イ: "i",
    ウ: "u",
    エ: "e",
    オ: "o",
  };
  return Object.keys(map).includes(s) ? map[s] : "";
};
const toHalfWidth = (str) => {
  let result = "";
  const reg = /[a-z0-9０-９]/i;
  for (let i = 0; i < str.length; i++) {
    // 英数字以外の言語メソッドの平仮名
    if (/[あ-おア-エ]/.test(str[i])) {
      result += jp2en(str[i]);
      continue;
    }
    if (!reg.test(str[i])) {
      continue;
    }
    const c = str.charCodeAt(i);
    if (c >= 0xff01 && c <= 0xff5e) {
      // full string
      result += String.fromCharCode(c - 0xfee0);
    } else {
      result += str.charAt(i);
    }
  }
  return result;
};

const trimEnNum = (str) => {
  const reg = /[^0-9a-z\\S]+/gi;
  const ans = str.replace(reg, "");
  return ans;
};

const Home = () => {
  const preCodeRef = useRef();
  const afterCodeRef = useRef();
  const tempRef = useRef();
  const [preCode, setPreCode] = useState("");
  const [afterCode, setAfterCode] = useState("");

  const preKeyDown = (e) => {
    // const reg = /[a-z0-9０-９あ-おア-エ]/i;
    const reg = /[a-z0-9]/i;
    if (!reg.test(e.key) || e.key === "Space") {
      e.preventDefault();
    }
  };
  const afterKeyDown = (e) => {
    if (e.keyCode === 8 && afterCode.length === 0) {
      preCodeRef.current?.focus();
      return;
    }
    // const reg = /[a-z0-9０-９あ-おア-エ]/i;
    const reg = /[a-z0-9]/i;
    if (!reg.test(e.key) || e.key === "Space") {
      e.preventDefault();
    }
  };
  const preCodeChange = (e) => {
    // const s = toHalfWidth(e.target.value);
    const s = e.target.value;
    // const trimCode = s.replace(/\s+/g, "");
    const trimCode = trimEnNum(s);
    // const s = e.target.value;
    // const trimCode = s.replace(/[^0-9a-z\S]+/gi, "");
    const preTrimCode = trimCode.slice(0, 5);
    // paste の状況で
    const afterTrimCode = trimCode.slice(5, 8);
    if (preTrimCode.length === 5) {
      /**
       * bug fix: 日本語ローマ入力方法でinput filed 変える時自動的に入力しました。
       * 無用の文字なので他のところで接する
       */
      tempRef.current?.focus();
      setTimeout(() => {
        afterCodeRef.current?.focus();
      }, 100);
    }
    if (afterTrimCode.length > 0) {
      setAfterCode(afterTrimCode);
    }
    setPreCode(preTrimCode);
    // console.log(preTrimCode);
    preCodeRef.current.value = preTrimCode;
    // setModifyState("modified");
    if (preTrimCode.length === 5 && afterTrimCode.length === 3) {
      // void getAgency(`${preTrimCode}${afterTrimCode}`);
    } else if (preTrimCode.length === 5 && afterCode.length === 3) {
      // void getAgency(`${preTrimCode}${afterCode}`);
    }
  };
  const afterCodeChange = (e) => {
    // const s = toHalfWidth(e.target.value);
    const s = e.target.value;
    // const trimCode = s.replace(/\s+/g, "").slice(0, 3);
    const trimCode = trimEnNum(s).slice(0, 3);
    if (trimCode.length === 3) {
      afterCodeRef.current?.blur();
    }
    setAfterCode(trimCode);
    afterCodeRef.current.value = trimCode;
    // setModifyState("modified");
    if (trimCode.length === 3 && preCode.length === 5) {
      // void getAgency(`${preCode}${trimCode}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        ref={preCodeRef}
        onKeyDown={preKeyDown}
        onChange={preCodeChange}
        value={preCode}
      />
      <input type="text" ref={tempRef} style={{ display: "none" }} />
      <input
        type="text"
        value={afterCode}
        ref={afterCodeRef}
        onKeyDown={afterKeyDown}
        onChange={afterCodeChange}
      />
    </div>
  );
};

export default Home;
