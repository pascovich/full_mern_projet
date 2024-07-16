// import logo from "./logo.svg";
import "./App.css";
import Routes from "./components/routes";
import { UidContext } from "./components/AppContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getUser } from "./actions/userActions";

function App() {
  const [Uid, setUid] = useState(null);
  // redux store
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchToken() {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtId`,
        withCredentials: true,
      })
        .then((res) => {
          // console.log(res);
          setUid(res.data);
        })
        .catch((err) => {
          console.log("no token");
        });
    }
    fetchToken();

    if (Uid) dispatch(getUser(Uid));
  }, [Uid]);

  return (
    <UidContext.Provider value={Uid}>
      <Routes />
    </UidContext.Provider>
  );
}

export default App;
