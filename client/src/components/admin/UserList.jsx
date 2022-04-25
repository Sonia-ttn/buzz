import Header from "../header/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import pic from "./user.png";

function UserList() {
  const [data, setData] = useState([]);

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
  
  const deleteUser = async (userId) => {
    try {
      const url = 'http://localhost:5000/deleteuser';
      const head = "12 " + localStorage.getItem("token");
      const res = await axios.post(url, {userId},{
        headers: {
          tokn: head,
        },
      });
     
      window.location.reload();
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.message);
      }
    }
  };

  return (
    <div>
      <Header />
      <h1
        style={{
          textAlign: "center",
          margin: "40px",
          textShadow: "2px 2px 4px #000000",
          textDecoration: "underline",
        }}
      >
        Users Lists
      </h1>

      <div
        className="card text-white bg-info mb-3 mx-auto"
        style={{ maxWidth: "18rem" }}
      >
        <div className="card-header" style={{ textAlign: "center" }}>
          <h5>Users</h5>
        </div>
        <div className="card-body">
          <h5 className="card-title " style={{ textAlign: "center" }}>
            Total Users : {`${data.length}`}
          </h5>
        </div>
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
            
            <div className="card " style={{ width: "450px", marginTop: "20px" }} key={user._id}>
              <div className="row  g-0">
                <div className="col-sm-5">
                  <img
                    src={pic}
                    className="card-img-top "
                    style={{ border: "none", height: "220px" }}
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
                    <p className="card-text" style={{ textAlign: "center" }}>
                      {user._id}
                    </p>
                    <p className="card-text" style={{ textAlign: "center" }}>
                      {user.email}
                    </p>
                    <i
                      className="fa fa-trash "
                      style={{ alignItems: "center" }}
                      onClick={()=>deleteUser(user._id)}
                    ></i>
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

export default UserList;
