import React from 'react'
import {useState,useParams} from "react";
import styles from "./style.module.css";

import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const Reset=()=> {
  //destructure token
  const {resetLink}=useParams();
  
  
  console.log(resetLink);

  const [data, setData] = useState({ newPassword: "" });
  const [error, setError] = useState("");
  
 const navigate = useNavigate();
 
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const Submitreset = async (e) => {
    e.preventDefault();
    
    try {

      const url = "http://localhost:5000/resetpassword";

      const { data: res } = await axios.post(url, data);
      console.log(res);
      toast.success("Password changed!! Please login")
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
      
      setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="styles.login_container">
      <div className="styles.login_form_container">
        <h1>Enter New Password</h1>
        <form className={styles.form_container} onSubmit={Submitreset}>

        <input
              type="password"
              placeholder="New Password"
              name="New Password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
       

            <button type="button" className={styles.green_btn}>
              Save New password
            </button>

        </form>
      </div>
    </div>
  )
}

export default Reset;
