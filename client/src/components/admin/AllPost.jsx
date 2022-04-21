import React from "react";
import Header from "../header/Header";

function AllPost() {
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
    </div>
  );
}

export default AllPost;
