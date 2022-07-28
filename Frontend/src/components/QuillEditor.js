import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// sendUp is the prop passed in from the parent- which is a function
// payload prop is only used for readOnly case
function QuillEditor({ sendUp, readMode, payload }) {
  
  // Tracking contents with local state
  const [contents, setContents] = useState("");

  // 'content' is DIFF from 'contents'- content is 1 of 4 arguments expected by react-quill for a handler function
  function handleChange(content, delta, source, editor) {
    setContents(editor.getContents());
  }

  // CANNOT SENDUP IN THE ONCHANGE FUNCTION! - IT WILL LAG BY ONE CHANGE
  useEffect(() => {
    if(sendUp !== undefined){
      //console.log(JSON.stringify(contents));
      sendUp(JSON.stringify(contents)); // stringify before sendup. pass sendup to useEffect callback
    }
  }, [contents]);

  // ReactQuill element to return
  if (readMode === false) {
    return (
      <div>
        <ReactQuill
          defaultValue={payload}
          onChange={handleChange}
          theme="snow"
        />
      </div>
    );
  } else {
    return (
      <div>
        <ReactQuill value={payload} theme="bubble" readOnly={true} />
      </div>
    );
  }
}

export default QuillEditor;
