import {useState,useEffect} from "react";
import Header from "../header/Header";
import styles from "./style.module.css";
import pic from "./user.png";
import axios from 'axios'
import MyPost from "./MyPost";

function UserProfile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [showResults, setShowResults] = useState(false)
  const [data, setData] = useState([]);
  const [followers, setfollowers] = useState([]);
  const [following, setfollowing] = useState([]);
 

  const getPost = async () => {
    try {
      const url = "http://localhost:5000/mypost";
      const head = "12 " + localStorage.getItem("token");
      const  post  = await axios.get(url, {
        headers: {
          tokn: head,
        },
      });

    //  console.log(post);
     // console.log(post.data.mypost);
      setData(post.data.mypost)
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

  const getfollowersfollowing = async () => {
    try {
      const url = "http://localhost:5000/followersfollowing";
      const head = "12 " + localStorage.getItem("token");
      const  userinfo  = await axios.get(url, {
        headers: {
          tokn: head,
        },
      });

   console.log(userinfo.data[0])
   setfollowers(userinfo.data[0].followers)
   setfollowing(userinfo.data[0].following)
    
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
    getPost();
    getfollowersfollowing();
    
  }, []);
  const mypost=()=>{
      if(showResults===true){
          setShowResults(false)
      }
      else{
          setShowResults(true)
      }
  }
  console.log(followers)
  console.log(following)
  return (
    <div>
      <Header />
      <div className="card container  rounded bg-white mt-5 mb-5">
        <div className="row ">
          <div className="ms-5 col-md-4 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className=" mt-5"
                width="150px"
                style={{ border: "none" }}
                src={pic}
              />
             
              <span className="font-weight-bold" style={{marginTop:"20px"}}>
                <h5 className="text-secondary">{localStorage.getItem("user") &&
                  `${user.firstname} ${user.lastname}`}</h5>
              </span>
              <span className="text-black-50" style={{marginTop:"10px"}}>{`${user.email}`}</span>
              <span className="text-black-50" style={{marginTop:"10px"}}><h6 className="text-primary">My Total Posts : {`${data.length}`}</h6></span>
              <span className="text-black-50" style={{marginTop:"10px"}}><h6 className="text-primary">Followers : {`${followers.length}`}</h6></span>
              <span className="text-black-50" style={{marginTop:"10px"}}><h6 className="text-primary">Following : {`${following.length}`}</h6></span>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                  onClick={mypost}
                >
                  My Post
                </button>
              </div>
            </div>
          </div>
          <div className=" ms-5 col-md-7 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Edit Profile</h4>
              </div>
              <div className="row mt-1">
                <div className="col-md-6">
                  <label className="labels">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    value={`${user.firstname}`}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    value=""
                    placeholder={`${user.lastname}`}
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels">Designation</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Designation"
                    value="Trainee"
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">My Website</label>
                  <input
                    type="text"
                    className="form-control"
                    value=""
                    placeholder="My Website"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels">Gender</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="country"
                    value="Male"
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Birthday</label>
                  <input
                    type="text"
                    className="form-control"
                    value=""
                    placeholder="state"
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels">City</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="country"
                    value="Noida"
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">State/Region</label>
                  <input
                    type="text"
                    className="form-control"
                    value="Uttar Pradesh"
                    placeholder="state"
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button"
                  type="button"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
        </div>
        {showResults &&  data.map((datas) => {
        return <MyPost datas={datas} key={datas.id} />;
      })}


        


      
    </div>
  );
}

export default UserProfile;
