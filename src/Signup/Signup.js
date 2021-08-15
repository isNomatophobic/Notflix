import SignupNavbar from "./Components/SignupNavbar";
import Registration from "./Components/BodyComponents/Registration";
import Regform from "./Components/BodyComponents/Regform";

import "./Signup-Styles.css";
import Footer from "../Login/Components/LoginFooter";
import { BrowserRouter as Switch, Route, useHistory } from "react-router-dom";
import { useRef } from "react";
function Signup({ match }) {
  // let { path, url } = useRouteMatch();
  const history = useHistory();
  console.log(`${match.path}/regform`);
  return (
    <div className="signup-container">
      <SignupNavbar />
      <div className="signupBody-container">
        <Switch>
          <Route path={`${match.path}/registration`} exact>
            <Registration />
          </Route>
          <Route path={`${match.path}/regform`} exact>
            <Regform parentHistory={history} />
          </Route>

          {/* <Route path={`${match.path}/*`}>
            qwew
          </Route> */}
        </Switch>
      </div>
      <Footer reg={true} />
    </div>
  );
}

export default Signup;
