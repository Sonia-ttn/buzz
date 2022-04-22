import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./style.module.css";
import pic from "./logo-large.png";
import { userContext } from "../../App";
import { ToastContainer, toast } from 'react-toastify';
import { GoogleLogin } from 'react-google-login';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const { state, dispatch } = useContext(userContext);
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const navigate = useNavigate();
  //google login
const onLoginSuccess=async(res)=>{
  console.log(res);
  axios({
    method:"POST",
    url:"http://localhost:5000/googlelogin",
    data:{tokenId:res.tokenId}
  })
  //if user successfully wants to create an api call and return message from backend api
 
  .then((res) =>{
    console.log("google login success",res);
    navigate("/home");
  })
  .catch(res=>{
    console.log("google login failed",res);
    
  }
  )
}

const onLoginFailure=(error)=>{
   console.log(error);
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/signin";
      const { data: res } = await axios.post(url, data);
      console.log(res);
      localStorage.setItem("token", res.token);

      localStorage.setItem("user", JSON.stringify(res.user));
      dispatch({ type: "USER", payload: res.user });
      console.log(state.data)
     

      navigate("/home");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
      //  toast.error(error.response.data.message)
      setError(error.response.data.message);
      }
    }
  };
  
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <img
            src={pic}
            style={{ border: "0", marginTop: "2px" }}
            alt="..."
            height="36"
          />
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>LOGIN</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}  >
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
          </Link>
           <p>OR</p>

           <div>
            <GoogleLogin
              clientId="905525222638-vpb75i5ilgu84vj74dr1d484rg2q4mt9.apps.googleusercontent.com"
              buttonText="Log in with Google"
              onSuccess={onLoginSuccess}
              onFailure={onLoginFailure}
              cookiePolicy={'single_host_origin'}
            /> 

          
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
