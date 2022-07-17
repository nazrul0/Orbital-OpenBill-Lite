import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

// props have been destructured
// sendUp is the prop passed in from the parent- which is a function
// payload prop is only used for readOnly case
function QuillEditor({sendUp, readMode, payload}) {
  // we track the contents with local state
  const [contents, setContents] = useState();
  
  // content here is DIFF from contents above
  // content is 1 of the 4 arguments expected by react-quill for a handler function
  function handleChange (content, delta, source, editor) {
    // we set contents after we get a quill delta
    setContents(editor.getContents());
    // we send the contentS up to parent. Not content- that would be html string
    // we also stringify it first
    sendUp(JSON.stringify(contents));
  }  

  if(readMode === false){
    return (
      <div>
        <ReactQuill 
          onChange={handleChange} 
          theme="snow"
        />
      </div>
    );
  }
  else{
    return(
      <div>
        <ReactQuill 
          value={payload} 
          theme="bubble"
          readOnly={true}
        />
      </div>
    )
  }

}

export default QuillEditor;