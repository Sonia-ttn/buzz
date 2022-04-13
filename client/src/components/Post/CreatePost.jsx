import React, { useState } from "react";
import Header from "../header/Header";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./createpost.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreatePost() {
  const [pic, setpic] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  /* function handleFileInput(e) {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setpic(reader.result);
    };
    console.log(pic);
  }*/
  console.log(url);
  const addPost = async (e) => {
    let result;
    e.preventDefault();
    const data = new FormData();
    data.append("file", pic);
    data.append("upload_preset", "buzzttn");
    //data.append("cloud_name","daart3ooc")

    var uri = "https://api.cloudinary.com/v1_1/daart3ooc/upload";

    await axios
      .post(uri, data)
      .then(function (res) {
        result = res.data.secure_url;
        setUrl(result);
      })
      .catch(function (err) {
        console.log(err);
      });

    setUrl(result);

    const data1 = { title, description, url };

    try {
      const url = "http://localhost:5000/createpost";
      const head = "12 " + localStorage.getItem("token");
      console.log(head);

      const { res } = await axios.post(
        url,
        { data1 },
        {
          headers: {
            tokn: head,
          },
        }
      );

      //console.log(res);

      //localStorage.setItem("user", res.data.user1.firstname);
      toast('🦄 Wow so easy!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      navigate("/");
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

      <form onSubmit={addPost}>
        <h1>New Post</h1>
        <label>
          <h6>Title</h6>
        </label>
        <input
          name="name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>
          <h6>Description</h6>
        </label>
        <textarea
          type="text"
          className="form-control"
          value={description}
          id="formGroupExampleInput2"
          placeholder="Desciption...."
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="exampleFormControlFile1">
          <h6>pic</h6>
        </label>
        <input
          type="file"
          name="pic"
          className="form-control-file"
          id="exampleFormControlFile1"
          onChange={(e) => setpic(e.target.files[0])}
        />

        {/* {pic !== "" && (
            <img src={pic} alt="sorry" height="100px" width="100px" />
          )}*/}

        <input type="submit" className="submitButton" />
      </form>
    </div>
  );
}

export default CreatePost;
