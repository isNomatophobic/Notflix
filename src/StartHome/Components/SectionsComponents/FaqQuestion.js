import { useState } from "react";
import { ReactComponent as Cross } from "assets/cross.svg";

function FaqQuestion({ title, text1, text2 }) {
  const [isClicked, setClicked] = useState(false);
  console.log(title);
  var changer = () => {
    setClicked((prevClicked) => !prevClicked);
  };
  return (
    <div className="faqQuestion-container" onClick={changer}>
      <div className="faqQuestion">
        {title}
        <Cross
          style={
            isClicked
              ? { transform: "translate(-50%,-50%) rotate(0deg)" }
              : undefined
          }
        />
      </div>
      <div
        className="faqResponse"
        style={!isClicked ? { maxHeight: "0" } : undefined}
      >
        <span>
          {text1}
          <br />
          <br />
          {text2}
        </span>
      </div>
    </div>
  );
}
export default FaqQuestion;
