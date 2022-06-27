import React from "react";
import "./ArticleRect.css";
import logo from "../imgs/plus.png";

function ArticleRect(props) {
  return (
    <div>
      <div className="articlePreviewContainer">
        {/* Replace placeholder title and body using props when ready */}
        {/* <h4 className="articlePreviewTitle">An article about something</h4>
        <p className="articlePreviewBody">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nunc
          augue, ultricies at bibendum at, vehicula nec nisl. Ut suscipit
          aliquam rutrum. Ut vitae neque dictum, elementum eros tincidunt,
          luctus massa. Vestibulum auctor, nulla quis aliquam porta, sem nulla
          congue orci, at dictum elit ante quis lectus.
        </p> */}
        <h2 className="articlePreviewTitle">{props.title}</h2>
        <p className="articlePreviewBody">{props.content}</p>
        <img className="articleIcon" src={logo} alt="Article Icon" />
      </div>
    </div>
  );
}

export default ArticleRect;
