import React from 'react'
import {Link} from 'react-router-dom'
function List({data}) {
  return (
    <div>
       <h6 class="category-tag technology" style={{marginTop:'20px',marginLeft:'20px'}}>
<img
  className="shareProfileImg"
  style={{ margin: "2px",border:'0' }}
  src={data.image}
  
  alt=""
/>
<span>
  <Link
    to="/profile"
    style={{
      textDecoration: "none",
      color: "black",
      fontSize: "20px",
      margin: "15px",
    }}
  >
    {data.name}
  </Link>
</span>
</h6>
    </div>
  )
}

export default List