// import React, { useCallback } from "react";
// import Quill from "react-quill";
// import "quill/dist/quill.snow.css";

// function QuillEditor() {
//   const wrapperRef = useCallback((wrapper) => {
//     if (wrapper == null) return;

//     wrapper.innerHTML = "";
//     const editor = document.createElement("div");
//     wrapper.append(editor);
//     new Quill(editor, { theme: "snow" });
//   }, []);

//   return <div id="container" ref={wrapperRef}></div>;
// }

// export default QuillEditor;

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function QuillEditor() {
  const [docsDesc, setDocsDesc] = useState("");
  const getQuillData = (value) => {
    setDocsDesc(value);
  };

  useEffect(() => {
    console.log(docsDesc);
  });

  return (
    <div>
      <ReactQuill value={docsDesc} onChange={getQuillData} />
    </div>
  );
}
