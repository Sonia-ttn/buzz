import { useState, useEffect } from "react";
import Header from "../header/Header";
import { Link, Routes, Route, BrowserRouter } from "react-router-dom";
import "./styles.css";
import axios from "axios";
import UserList from "./UserList";
import AllPost from "./AllPost";
import pic from "./user1.png";
import pic1 from "./post.png";
import pic2 from "./post1.png";

function AdminScreen() {
  const [data, setData] = useState([]);
  const [post, setpost] = useState([]);

  const getPost = async () => {
    try {
      const url = "http://localhost:5000/allpost";
      const head = "12 " + localStorage.getItem("token");
      const post = await axios.get(url, {
        headers: {
          tokn: head,
        },
      });

      //  console.log(post);
    
      setpost(post.data.post);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error);
      }
    }
  };

  const getAllUsers = async () => {
    try {
      const url = "http://localhost:5000/getallusers";
      const head = "12 " + localStorage.getItem("token");
      const user = await axios.get(url, {
        headers: {
          tokn: head,
        },
      });

      
      setData(user.data);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    getAllUsers();
    getPost();
  }, []);
  return (
    <div>
      <Header />
      <div className="row justify-content-center p-3">
        <div className="col-md-10">
          <h2
            style={{
              fontSize: "40px",
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
              textShadow: "2px 2px 4px #000000",
            }}
          >
            Admin Pannel
          </h2>

          <ul className="adminfunction">
            <li>
              <Link to={"/admin/userlist"} style={{ color: "white" }}>
                Users List
              </Link>
            </li>

            <li>
              <Link to="/admin/allposts" style={{ color: "white" }}>
                All Posts
              </Link>
            </li>
          </ul>
          

          <div className="row">
            <div className="col-md-6">
              <div
                className="card  mb-3 mx-auto shadow p-3 mb-5 bg-white rounded"
                style={{ width: "220px" }}
              >
                <img
                  className="card-img-top"
                  src={pic}
                  alt="Card image cap"
                  style={{ height: "200px", width: "200px", border: "none" }}
                />
                <div
                  className="card-header text-white bg-danger"
                  style={{ textAlign: "center" }}
                >
                  <h5>Users</h5>
                </div>
                <div className="card-body text-white bg-info">
                  <h5 className="card-title " style={{ textAlign: "center" }}>
                    Total Users : {`${data.length}`}
                  </h5>
                </div>
                <Link to='/admin/userlist' className="btn btn-secondary" style={{marginTop:'5px'}}><h6>User List</h6></Link>
                
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="card  mb-3 mx-auto shadow p-3 mb-5 bg-white rounded"
                style={{ width: "220px",height:'auto' }}
              >
                <img
                  className="card-img-top"
                  src={pic2}
                  alt="Card image cap"
                  style={{ height: "200px", width: "200px", border: "none" }}
                />
                <div
                  className="card-header text-white bg-danger"
                  style={{ textAlign: "center",}}
                >
                  <h5>Posts</h5>
                </div>
                <div className="card-body text-white bg-info">
                  <h5 className="card-title " style={{ textAlign: "center" }}>
                    Total Post : {`${post.length}`}
                  </h5>
                </div>
                <Link to='/admin/allposts' className="btn btn-secondary" style={{marginTop:'5px',color:'white'}}><h6>Posts List</h6></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminScreen;
