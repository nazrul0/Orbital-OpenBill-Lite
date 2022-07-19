import React from "react";
import "./ArticleRect.css";
import treeImage from "../imgs/OB(tree).png";
import educationImage from "../imgs/OB(education).png";
import moneyImage from "../imgs/OB(money).png";
import mailImage from "../imgs/OB(mail).png";
import ringImage from "../imgs/OB(ring).png";
import thumbprintImage from "../imgs/OB(thumbprint).png";
import plusImage from "../imgs/OB(plus).png";
import cityImage from "../imgs/OB(city).png";
import busImage from "../imgs/OB(bus).png";
import OB from "../imgs/OB(logo).png";
import QuillEditor from "./QuillEditor";

function ArticleRect(props) {
  let image;
  switch (props.category) {
    default:
      image = OB;
      break;
    case "Environment":
      image = treeImage;
      break;
    case "Education":
      image = educationImage;
      break;
    case "Economic":
      image = moneyImage;
      break;
    case "Social Welfare":
      image = mailImage;
      break;
    case "Gender":
      image = ringImage;
      break;
    case "Privacy/Security":
      image = thumbprintImage;
      break;
    case "Health":
      image = plusImage;
      break;
    case "Housing":
      image = cityImage;
      break;
    case "Transport":
      image = busImage;
      break;
  }

  console.log(props.content);

  return (
    <div className="flex justify-center w-screen">
      <div className="articlePreviewContainer w-4/5 md:w-3/4 lg:w-2/3 flex items-center justify-between">
        <h2 className="articlePreviewTitle text-lg md:text-xl lg:text-2xl">
          {props.title}
        </h2>

        <img
          className="w-16 md:w-20 lg:w-24 rounded-full "
          src={image}
          alt="Article Icon"
        />
      </div>
    </div>
  );
}

export default ArticleRect;

//
