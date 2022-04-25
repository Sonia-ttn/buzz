
import styles from "./style.module.css";
import { useState} from "react";
import axios from "axios";
import React from 'react';
 
// Importing toastify module
import {toast} from 'react-toastify';
 
// Import toastify css file
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from "react-router-dom";
 
 // toast-configuration method,
 // compulsory one.
toast.configure()


function Forgot() {
  const [data, setData] = useState({ email: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const navigate = useNavigate();
  
  const submit=async(e)=>{
   
    e.preventDefault();
    try {
      
      const url = "http://localhost:5000/forgot-password";
      const { data: res } = await axios.put(url, data);
      //response from backend
      console.log("Successfull msg",res);
      toast('Check your email',
           {position: toast.POSITION.TOP_CENTER})
      
     // navigate("/login")
     
    } 
    catch (error) {
      if (error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500) {
      setError(error.response.data.message);}
     

    }
  };

  return (
    <div className={styles.login_container}>

      <form className={styles.login_form_container} onSubmit={submit}>

        <h1>Forgot Password</h1>
        
        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          value={data.email}
          onChange={handleChange}
          required
          className={styles.input} 
        />
        
        {error && <div className={styles.error_msg}>{error}</div>}

        <button type="submit"className={styles.green_btn} >Send Reset Link</button>
      

      </form>

    </div>
  )
  };

export default Forgot;
