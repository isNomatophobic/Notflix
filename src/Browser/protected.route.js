
import { useMemo } from "react";
import { Switch,Route,useLocation,Redirect } from "react-router-dom";


function ProtectedRoute({children,...rest}) {

    const jwt =sessionStorage.getItem('jwt')
    console.log(`jwt:${jwt}`)
    return(
        <Route {...rest}>
            <>{jwt?children:<Redirect to="/"></Redirect>}</>
        </Route>
    )

}

export default ProtectedRoute;
