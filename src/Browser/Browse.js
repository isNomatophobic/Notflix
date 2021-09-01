import BrowseAccounts from "./BrowseAccounts/BrowseAccounts";
import ManageAccounts from "./BrowseAccounts/ManageAccounts";
import CreateProfile from "./BrowseAccounts/CreateProfile";
import { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import ManageProfile from "./BrowseAccounts/ManageProfile";
import BrowseMain from "./BrowseMain/BrowseMain";

function Browse() {
  const userEmail = sessionStorage.getItem("userEmail");

  const [isLoading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState([]);

  const getAccounts = async () => {
    try {
      const params = {
        email: userEmail,
      };
      const url = "https://netlixclone-backend.herokuapp.com/login/accounts";
      const res = await axios.get(url, { params });
      var acc = res.data;
      setAccounts(acc);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAccounts();
  }, []);
  return (
    <Switch>
      <Route path={`/browse/accounts`}>
        {isLoading ? <></> : <BrowseAccounts accounts={accounts} />}
      </Route>
      <Route path={`/browse/manage`}>
        {isLoading ? <></> : <ManageAccounts accounts={accounts} />}
      </Route>
      <Route path={`/browse/createProfile`}>
        {isLoading ? (
          <></>
        ) : (
          <CreateProfile accounts={accounts} setAccounts={setAccounts} />
        )}
      </Route>
      <Route path={`/browse/manageProfile`}>
        {isLoading ? (
          <></>
        ) : (
          <ManageProfile accounts={accounts} setAccounts={setAccounts} />
        )}
      </Route>
      <Route>{isLoading ? <></> : <BrowseMain accounts={accounts} />}</Route>
    </Switch>
  );
}

export default Browse;
