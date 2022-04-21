import React from 'react'
import {Link} from 'react-router-dom'
import pic from "./user.png";
function List({item}) {
  
  return (
    <div>
       <h6 class="category-tag technology" style={{marginTop:'20px',marginLeft:'20px'}}>
<img
  className="shareProfileImg"
  style={{ margin: "2px",border:'0' }}
  src={pic}
  
  alt=""
/>
<span>
  <Link
    to="/profile"
    style={{
      textDecoration: "none",
      color: "black",
      fontSize: "15px",
      margin: "5px",
    }}
  >
    {`${item.firstname} ${item.lastname}`}
  </Link>
</span>
</h6>
    </div>
  )
}

export default List