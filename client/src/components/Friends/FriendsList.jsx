import { useEffect, useState } from "react";
import axios from "axios";
import pic from "./user.png";
import Header from "../header/Header";
import "./stylemodule.css";



function FriendsList() {
  const [searchKey, setSearchKey] = useState("");
  const [data, setData] = useState([]);
  const user1 = JSON.parse(localStorage.getItem("user"));
  //console.log(JSON.parse(localStorage.getItem("user"))._id);
  const getAllUsers = async () => {
    try {
      const url = "http://localhost:5000/getallusers";
      const head = "12 " + localStorage.getItem("token");
      const user = await axios.get(url, {
        headers: {
          tokn: head,
        },
      });

      //Console.log(data)
      //Console.log(data)
      //Console.log(data)

      setData(user.data);
      //Console.log(data)
      //Console.log(data)
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
  }, []);


  const follow = async (user_id) => {
    try {
      const url = "http://localhost:5000/follow";
      const head = "12 " + localStorage.getItem("token");
      const res = await axios.put(
        url,
        { followId: user_id },
        {
          headers: {
            tokn: head,
          },
        }
      );
    
        console.log(res)
      window.location.reload();
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



  return (
    <div>
      <Header />
      <div class="topnav">
        <input
          type="text"
          className="search"
          placeholder="Search Friends..."
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",

          alignContent: "space-around",
          flexDirection: "row",
          flexWrap: "wrap",
          flexGrow: "1",
        }}
      >
        {data.map((user) => {
          return (
            JSON.parse(localStorage.getItem("user"))._id!==user._id &&
            <div>
              <div
                className="card "
                style={{ width: "450px", marginTop: "20px",height:'150px' }}
                key={user._id}
              >
                
                <div className="row  g-0">
                  <div className="col-sm-5">
                    <img
                      src={pic}
                      className="card-img-top "
                      style={{ border: "none", height: "150px" }}
                      alt="..."
                    />
                  </div>
                  <div className="col-sm-7">
                    <div className="card-body">
                      <h3
                        className="card-title"
                        style={{ textAlign: "center", padding: "20px 0" }}
                      >
                        {user.firstname} {user.lastname}
                      </h3>
                      
                      {user.followers.includes(user1._id)?<button
              id="post"
              className="btn btn-primary"
              style={{
                border: "none",
                borderRadius: "25%",
                marginTop: "15px",
                marginLeft:'30px',
                paddingLeft: "20px",
                paddingRight: "20px",
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
              }}
              
            >
              Un-Follow
            </button>:<button
              id="post"
              className="btn btn-primary"
              style={{
                border: "none",
                borderRadius: "25%",
                marginTop: "15px",
                marginLeft:'30px',
                paddingLeft: "20px",
                paddingRight: "20px",
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
              }}
              onClick={()=>follow(user._id)}
            >
              Follow
            </button>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FriendsList;
