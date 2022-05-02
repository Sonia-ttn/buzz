import Header from "./components/header/Header";
import UserProfile from "./components/profile/UserProfile";
import { useEffect, createContext, useReducer, useState } from "react";
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
import Forgot from "./components/forgotpassword/index";
import Reset from "./components/resetpassword/index";
import { reducer, initial } from "./reducers/userReducer";
import AdminScreen from "./components/admin/AdminScreen";
import NotFound from './components/NotFound/NotFound'
import UserList from "./components/admin/UserList";
import AllPost from "./components/admin/AllPost";


export const userContext = createContext();

const Routing = () => {
  const [admin,setAdmin]=useState(false)
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if(user){
      setAdmin(user.isAdmin)
    }

    if (!user) {
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
          <Route path="/forgot"  exact element={<Forgot/>}/>
        <Route path="/profile/:userid" exact element={<UserProfile />} />
        {admin ? <Route path="/admin"  element={<AdminScreen />} />:''}
        {admin?<Route path="/admin/userlist"  element={<UserList/>} exact/>:''}
            {admin?<Route path="/admin/allposts"  element={<AllPost/>} exact/>:""}
        <Route path='*' element={<NotFound/>} exact/>
         <Route path="/reset/token/:resetLink"  exact element={<Reset/>}/>
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
