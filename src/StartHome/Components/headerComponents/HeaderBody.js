// import {ReactComponent as Arrow} from "../../assets/arrow.svg"
import { useState } from "react";
import InputComponent from "./InputComponent";

function HeaderBody() {
  return (
    <div className="headerBody-container">
      <h1>Unlimited movies, TV shows, and more.</h1>
      <h2>Watch anywhere. Cancel anytime.</h2>
      <InputComponent />
    </div>
  );
}
export default HeaderBody;
