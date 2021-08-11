
function LoginFooter(p) {  

  return (
      <div className="loginFooter-container" style={{backgroundColor:p.reg?"#f3f3f3":"",borderTop: p.reg?"1px solid rgba(128,128,128,0.3)":"",minHeight:p.reg?"none":"190px"}}>
          <div className={p.reg?"loginFooter":"loginFooter loginFooter-login"}>
            <h2>Questions? Contact us.</h2>
            <ul>
                <li className="loginFooter-listItem"><a>FAQ</a></li>
                <li className="loginFooter-listItem"><a>Help Center</a></li>
                <li className="loginFooter-listItem"><a>Terms of Use</a></li>
                <li className="loginFooter-listItem"><a>Privacy</a></li>
                <li className="loginFooter-listItem"><a>Cookie Preferences</a></li>
                <li className="loginFooter-listItem"><a>Corporate Information</a></li>
            </ul>
          </div>
      </div>
  );
}

export default LoginFooter;
