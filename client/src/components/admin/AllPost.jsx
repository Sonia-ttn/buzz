import {useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Header from "../header/Header";
import Post from "./Post";

function AllPost() {

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

  useEffect(() => {
   
    getPost();
  }, []);
console.log(post)
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
        Posts List
      </h1>
      <div
        className="card text-white bg-info mb-3 mx-auto "
        style={{ maxWidth: "18rem" }}
      >
        <div className="card-header" style={{ textAlign: "center" }}>
          <h5>Posts</h5>
        </div>
        <div className="card-body">
          <h5 className="card-title " style={{ textAlign: "center" }}>
            Total Post : {`${post.length}`}
          </h5>
        </div>
      </div>
      {post.map((datas) => {
        return <Post datas={datas} key={datas.id} />;
      })}
     
    </div>
  );
}

export default AllPost;
