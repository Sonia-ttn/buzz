import Header from "./components/header/Header";
import UserProfile from "./components/profile/UserProfile";
import { useEffect, createContext, useReducer } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home/Home";
import CreatePost from "./components/Post/CreatePost";
import Login from "./components/Login/index";
import Signup from "./components/signup/index";
import { reducer, initial } from "./reducers/userReducer";

export const userContext = createContext();

const Routing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    //console.log(typeof user, user);

    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <Routes>
      <Route>
        <Route path="/" exact element={<Home />} />
        <Route path="/home" exact element={<Home />} />
        <Route path="/post" exact element={<CreatePost />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/login" exact element={<Login />} />
        <Route path="/profile" exact element={<UserProfile />} />

        {/* <Route path="/" element={<Navigate replace to="/login" />} />*/}
      </Route>
    </Routes>
  );
};

function App() {
  // const user = localStorage.getItem("token");
  const [state, dispatch] = useReducer(reducer, initial);
  return (
    <userContext.Provider value={{ state, dispatch }}>
      <Router>
        <Routing />
      </Router>
    </userContext.Provider>
  );
}

export default App;
