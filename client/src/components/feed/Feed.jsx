import "./feed.css";
import { useContext, useEffect, useState } from "react";
import Card from "../card/Card";
import NewPost from "../sharePost/NewPost";
import axios from "axios";
import pic from "./user.png";
import { Link } from "react-router-dom";
import Shop from "./Shop";
import { userContext } from "../../App";
function Feed() {
  const [data, setData] = useState([]);
 
  const getPost = async () => {
    try {
      const url = "http://localhost:5000/allpost";
      const head = "12 " + localStorage.getItem("token");
      const  post  = await axios.get(url, {
        headers: {
          tokn: head,
        },
      });

    //  console.log(post);
      console.log(post.data.post[0].title);
      setData(post.data.post)
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


  return (
    <div>
      
      {data.map((datas) => {
        return <Shop datas={datas} key={datas.id} />;
      })}
    </div>
  );
}

export default Feed;
