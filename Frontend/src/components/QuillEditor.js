import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// sendUp is the prop passed in from the parent. We pass a function,
// hence we destructure sendUp to use associated function below
function QuillEditor({sendUp}) {
  // we track the contents with local state
  const [contents, setContents] = useState("");
  
  // content here is DIFF from contents above
  // content is 1 of the 4 arguments expected by react-quill for a handler function
  function handleChange (content, delta, source, editor) {
    
    // we set contents after we get a quill delta
    setContents(editor.getContents());
    // we send the contentS up to parent. Not content- that would be html string
    // we also stringify it first
    sendUp(JSON.stringify(contents));
  }  

  return (
    <div>
      <ReactQuill 
        value={contents} 
        onChange={handleChange} 
        theme="snow"
      />
    </div>
  );
}

export default QuillEditor;