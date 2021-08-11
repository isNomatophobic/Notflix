import './normalize.css';
import StartHome from "./StartHome/StartHome"
import Login from "./Login/Login.js"
import Signup from "./Signup/Signup.js"
import Browse from "./Browser/Browse"
import ProtectedRoute from "./Browser/protected.route"
import ErrorPage from "./ErrorPage/ErrorPage"
import {BrowserRouter as Router , Switch , Route, Redirect} from "react-router-dom"

import {useEffect} from "react"

function App() {
  const jwt =sessionStorage.getItem('jwt')
  if(!jwt)
  return (
    <Router>
      <div className="main-container">
        <Switch>
          <Route path="/" exact component={StartHome}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/signup" component={Signup}/>
          <ProtectedRoute path="/browse">
            <Browse/>
          </ProtectedRoute>
          <Route path="*" component={ErrorPage}/>
        </Switch>
      </div>
    </Router>
  );
  else
  return(
    <Router>
    <div className="main-container">
      <Switch>
        <Route path="/" exact>
          <Redirect to="/browse"/>
        </Route>
        <Route path="/login" exact>
          <Redirect to="/browse"/>
        </Route>
        <Route path="/signup">
          <Redirect to="/browse"/>
        </Route>
        <ProtectedRoute path="/browse">
          <Browse/>
        </ProtectedRoute>
        <Route path="*" component={ErrorPage}/>
      </Switch>
    </div>
  </Router>
  )
}

export default App;
